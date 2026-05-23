# Insights de Routing Forms

## O que são Routing Forms

Formulários de roteamento que direcionam o visitante para o event type correto com base em suas respostas. Exemplo: "Qual é o seu problema?" → resposta X → agenda com técnico A.

## Dashboard de Routing

**Página**: `apps/web/app/(use-page-wrapper)/insights/routing/page.tsx`

Exibe métricas de uso dos formulários de roteamento.

## tRPC Endpoints

```
viewer.insights.routingFormStats
viewer.insights.routingFormResponses
```

### routingFormStats

Input: `{ startDate, endDate, teamId?, routingFormId? }`

Response:
```typescript
{
  totalResponses: number;
  routedToBooking: number;     // Respostas que geraram booking
  routedToExternalRedirect: number;
  routedToSelf: number;        // Respostas que voltaram ao mesmo form
}
```

### routingFormResponses

Paginação de respostas individuais com campos preenchidos.

## Estado Atual na ALLGED

Routing Forms não estão configurados na instância ALLGED. O dashboard de routing mostrará dados zerados.

Para criar um Routing Form:
1. Acesse `/routing-forms/forms`
2. Clique em "Novo formulário"
3. Adicione campos e configure roteamento

## Dados no DB

```sql
-- Ver formulários de roteamento
SELECT id, name, "teamId", disabled FROM "App_RoutingForms_Form";

-- Ver respostas
SELECT id, "formId", "createdAt" FROM "App_RoutingForms_FormResponse";
```

## Integração com Insights

Os gráficos de routing só aparecem se existirem formulários configurados. Com `teamId` da org ALLGED (id=2), filtra apenas os formulários da organização.
