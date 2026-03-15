# 🚀 Sistema de Gestão de Vendas (SGV)

Um sistema web leve, responsivo e moderno para cadastro e controle de vendas, utilizando **Supabase** como Backend as a Service (BaaS).

## 📋 Sobre o Projeto
Este projeto foi desenvolvido para facilitar o registro de vendas diárias. Ele permite que o usuário cadastre vendas, escolha a quantidade de parcelas (com cálculo automático de valor por parcela) e visualize um relatório detalhado com dashboard financeiro.

### ✨ Funcionalidades
- **Cadastro de Vendas:** Formulário intuitivo com cálculo em tempo real.
- **Relatório Dinâmico:** Listagem completa com busca inteligente (filtro por cliente ou produto).
- **Dashboard:** Visualização rápida do total de vendas e faturamento bruto.
- **Cálculo de Parcelamento:** Exibição detalhada de planos de pagamento (ex: 3x de R$ 50,00).
- **Design Responsivo:** Adaptado para computadores, tablets e celulares (formato de cards no mobile).
- **Gerenciamento:** Opção de excluir registros diretamente pelo relatório.

---

## 🏗️ Estrutura de Arquivos

```text
/
├── index.html          # Tela principal (Formulário de Cadastro)
├── vendas.html         # Relatório de Vendas (Dashboard e Listagem)
├── supabase.js         # Configuração e inicialização do cliente Supabase
├── app.js              # Lógica do formulário, cálculos e salvamento
└── README.md           # Documentação do projeto (este arquivo)