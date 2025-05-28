# Sistema de Controle de Ponto - Papelprint

Sistema Web para controle de ponto eletrônico com validação por geolocalização e selfie.

## 🧩 Funcionalidades

### Para Funcionários
- Login com usuário e senha
- Validação de geolocalização (50m)
- Captura de selfie
- Registro de até 4 batidas/dia
- Classificação automática de tipo de batida
- Visualização de comprovantes e selfies

### Para Administradores
- Filtro por funcionário e datas
- Visualização de registros com selfie
- Edição/Exclusão/Justificativa
- Exportação CSV
- Cálculo de banco de horas

## 🗂️ Estrutura de Arquivos
```
controle-ponto/
├── index.html       # Interface do funcionário
├── admin.html       # Painel do administrador
├── script.js        # Lógica JS unificada
├── style.css        # Estilos gerais
└── README.md        # Este arquivo
```

## 🧪 Tecnologias Utilizadas
- HTML5, CSS3, JS ES6
- API de Geolocalização
- API getUserMedia
- localStorage
- GitHub Pages

## 🚀 Publicação

Hospede em GitHub Pages ativando via `Settings > Pages` com a branch principal.

---

© 2025 Papelprint - Uso interno
