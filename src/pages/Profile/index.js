import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { updateProfileRequest } from '../../store/modules/user/actions';

import AvatarInput from './AvatarInput';

import { Container } from './styles';

const schema = Yup.object().shape({
   name: Yup.string(),
   email: Yup.string().email('Insira um e-mail válido'),
   oldPassword: Yup.string(),
   password: Yup.string().min(6, 'A senha necessita de 6 caracteres'),
   confirmPassword: Yup.string().min(6, 'A senha necessita de 6 caracteres'),
});

export default function Profile() {
   const dispatch = useDispatch();
   const profile = useSelector((state) => state.user.profile);

   function handleSubmit(data) {
      dispatch(updateProfileRequest(data));
   }

   return (
      <Container>
         <Form schema={schema} initialData={profile} onSubmit={handleSubmit}>
            <AvatarInput name="avatar_id" />

            <Input name="name" placeholder="Nome completo" />
            <Input
               name="email"
               type="email"
               placeholder="Seu endereço de e-mail"
            />

            <hr />

            <Input
               type="password"
               name="oldPassword"
               placeholder="Sua senha atual"
            />
            <Input type="password" name="password" placeholder="Nova senha" />
            <Input
               type="password"
               name="confirmPassword"
               placeholder="Confirmação de senha"
            />

            <button type="submit">Atualizar perfil</button>
         </Form>

         <button type="button">Sair do GoBarber</button>
      </Container>
   );
}
