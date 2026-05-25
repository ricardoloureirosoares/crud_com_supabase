# React + Vite

Este template fornece uma configuração mínima para fazer o React funcionar com Vite, incluindo HMR (Hot Module Replacement) e algumas regras do ESLint.

Atualmente, dois plugins oficiais estão disponíveis:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

O React Compiler não vem habilitado neste template por causa do impacto no desempenho durante desenvolvimento e build. Para adicionar, veja [esta documentação](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

Se você está desenvolvendo uma aplicação para produção, a recomendação é usar TypeScript com regras de lint com verificação de tipos (type-aware). Consulte o [template TS](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) para ver como integrar TypeScript e o [`typescript-eslint`](https://typescript-eslint.io) no seu projeto.
