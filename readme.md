# 📍 Sistema de Ponto Eletrônico - Papelprint

Sistema de controle de ponto web com validação por geolocalização e selfie, desenvolvido para uso interno da gráfica **Papelprint**.

## ✅ Funcionalidades

### Funcionário
- Login com usuário e senha
- Captura de selfie via webcam
- Validação por geolocalização (50m do endereço cadastrado)
- Registro de 4 batidas por dia (Entrada, Saída Almoço, Retorno, Saída Final)
- Visualização de comprovante após bater o ponto

### Administrador
- Login administrativo
- Visualização dos registros
- Filtro por funcionário e por data
- Edição e exclusão de registros
- Exportação para CSV

## 📂 Estrutura

```
sistema-ponto/
├── index.html       # Interface do funcionário
├── admin.html       # Painel do administrador
├── script.js        # Lógica JS unificada
├── style.css        # Estilo geral
├── README.md        # Esta documentação
```

## 🧪 Usuários predefinidos

| Usuário| Senha     | Nome             | Setor     |
|--------|-----------|------------------|-----------|
| emerson| 123456    | Emerson Caldeira | Produção  |
| flavio | 123456    | Flávio Furtado   | Produção  |
| elias  | 123456    | Elias Almo       | Design    |
| Admin  | ********* | Administrador    | Admin     |

## 🕒 Horários de Trabalho

### Emerson e Flavio
- Segunda à Quinta: 07:30 - 17:30
- Sexta-feira: 07:30 - 16:30

### Elias
- Segunda à Quinta: 08:00 - 18:00
- Sexta-feira: 08:00 - 17:00

Almoço: **1h obrigatória**. Menor que 1h = sem banco positivo. Maior que 1h = débito.

## 📍 Validação de Localização

- Local fixo: `Latitude: -23.477944`, `Longitude: -46.651000`
- Raio permitido: 50 metros
- Fora desse raio = ponto negado

## 💡 Tecnologias Utilizadas
- HTML5, CSS3, JavaScript
- API Geolocation do navegador
- API getUserMedia (Webcam)
- localStorage para persistência local
- GitHub Pages para hospedagem gratuita

## 🚀 Publicação

1. Suba os arquivos no GitHub
2. Vá em **Settings > Pages**
3. Selecione a branch `main` e root `/`
4. Acesse seu sistema por: `https://seuusuario.github.io/sistema-ponto`

## 🔧 Melhorias Futuras
- Integração com banco de dados real (Firebase, Supabase, etc)
- Login com QR Code ou Biometria
- PWA para acesso via ícone no celular
- Cálculo automático de banco de horas em tempo real

---

© 2025 | Gráfica Papelprint | Sistema de ponto desenvolvido com foco em eficiência e simplicidade.
