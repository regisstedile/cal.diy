# BLOQUEADOR — round-robin / managed-events não portáveis ainda

**Descoberto:** 2026-07-11 (tentativa Sprint 11.5A, revertida). Fase D/F do protocolo.

## Resumo

As procedures `roundRobinReassign`, `roundRobinManualReassign` (e por extensão
`getRoundRobinHostsToReassign`, e provavelmente as 3 de managed-events) **não são
portáveis hoje**. Não por dependência ausente — as deps existem — mas porque os
**services que elas chamam têm type errors reais** e nunca foram compilados no
grafo do trpc. Importá-los das procedures arrasta 3 erros para o pacote `trpc`,
que hoje type-checka limpo.

## Erros (pré-existentes nos services, `packages/features/ee/round-robin/`)

```
roundRobinManualReassignment.ts(265,36): error TS2339:
  Property 'onReassignment' does not exist on type 'BookingEventHandlerService'.
roundRobinReassignment.ts(170,5): error TS2353:
  'routingFormResponse' does not exist in type 'GetLuckyUserParams<IsFixedAwareUser>'.
roundRobinReassignment.ts(303,36): error TS2339:
  Property 'onReassignment' does not exist on type 'BookingEventHandlerService'.
```

Causa provável: os services foram restaurados (sprints 1-9) contra APIs do REF que
divergem do estado atual do fork — `BookingEventHandlerService` do fork não tem
`onReassignment`, e `GetLuckyUserParams` do fork não tem `routingFormResponse`.
Ficaram latentes porque nada os importava no caminho compilado do trpc (são lazy).

## Correção da Fase D anterior

A investigação inicial concluiu "RR portável, deps existem". Estava **incompleto**:
deps existirem ≠ deps type-checkarem. O gate F (type-check) pegou antes do commit —
a fatia 11.5A foi revertida inteira; o trpc voltou a 0 erros. Nenhum código quebrado
entrou.

## Pré-requisito para desbloquear (fatia própria, camada de features)

1. Alinhar `BookingEventHandlerService` (fork) com o uso em `roundRobinReassignment`/
   `roundRobinManualReassignment` — ou o service ganha `onReassignment`, ou os
   handlers param de chamá-lo.
2. Alinhar `GetLuckyUserParams` — remover/adaptar `routingFormResponse`.
3. Rodar `tsc` do pacote features (não só trpc) para achar outros latentes.
4. Só então portar as procedures RR/managed (11.5/11.6) sobre um service que compila.

É trabalho na camada de **features**, não no router — exige entender os services de
reatribuição. Decisão do dono se vale (RR é usado, mas o custo é maior que uma fatia
de router). Até lá, 11.5/11.6 ficam **fora do backlog portável** (reclassificar no
GAP como "bloqueado por dívida de tipo no service", distinto de "faltando").
