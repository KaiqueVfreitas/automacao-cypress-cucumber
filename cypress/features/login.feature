Feature: Processo de criação e validação de credenciais no ecommerce

   Scenario: Login com usuário não cadastrado
      Given que o usuário está na tela de login
      And preenche os campos de email e senha que não estão cadastrados no ecommerce
      When clicar no botão "Login"
      Then o sistema retorna o aviso "Epic sadface: Username and password do not match any user in this service"