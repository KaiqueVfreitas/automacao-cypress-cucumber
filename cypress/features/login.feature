Feature: Login no ecommerce com diferentes usuários

   Scenario: Login com usuário não cadastrado
      Given que o usuário está na tela de login
      And preenche os campos de email e senha que não estão cadastrados no ecommerce
      When clicar no botão "Login"
      Then o sistema retorna o aviso "Epic sadface: Username and password do not match any user in this service"

   Scenario: Usuário bloqueado no ecommerce
      Given que o usuário está na tela de login
      When tenta logar-se com usuário bloqueado
      Then deve visualizar a mensagem "Epic sadface: Sorry, this user has been locked out."

   Scenario: Acesso com diferentes usuários válidos
    Given que o ecommerce possui múltiplos usuários cadastrados
    Then o sistema autentica corretamente e concede acesso à conta correspondente quando o usuário faz login
