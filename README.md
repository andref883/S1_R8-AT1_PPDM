# VídeoFinder – Aplicação Mobile com Consumo de API

App React Native (Expo) que consome a API pública
`https://abhi-api.vercel.app/api/search/yts?text=<busca>` (busca de vídeos do YouTube).

## Telas
1. **Home** – título, descrição e botão para acessar os dados.
2. **Lista** – faz requisições à API e exibe cards com miniatura, título, canal, views e duração. Permite buscar novos vídeos.
3. **Detalhes** – miniatura grande, canal, views, duração, data, descrição e botão para abrir no YouTube.

Navegação com React Navigation (Native Stack).

## Como rodar
```bash
npm install
npx expo start
```
Pressione `a` para abrir no emulador Android (Android Studio) ou leia o QR code com o Expo Go.
