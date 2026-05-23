"use client";

import type { DateRangeFilterOptions } from "@calcom/features/data-table/lib/types";
import { ColumnFilterType } from "@calcom/features/data-table/lib/types";
import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";
import { DateRangeFilter } from "~/data-table/components/filters/DateRangeFilter";
import { DataTableProvider } from "~/data-table/DataTableProvider";

type DemoRow = {
  id: number;
  name: string;
  date: string;
};

const columnHelper = createColumnHelper<DemoRow>();

type ScenarioProps = {
  id: string;
  title: string;
  description: string;
  expected: string;
  range: DateRangeFilterOptions["range"];
};

const scenarios: ScenarioProps[] = [
  {
    id: "past",
    title: 'Range: "past"',
    description: "Restringe a seleção de datas apenas ao passado. Exibe predefinições compatíveis com datas passadas.",
    expected:
      "Predefinições visíveis: Hoje, Últimos 7 dias, Últimos 30 dias, Mês atual, Ano atual, Personalizado. maxDate do calendário = hoje.",
    range: "past",
  },
  {
    id: "future",
    title: 'Range: "future"',
    description: "Restringe a seleção de datas apenas ao futuro. Exibe apenas predefinições compatíveis com datas futuras.",
    expected: "Predefinições visíveis: somente Personalizado (predefinições com direção 'any'). minDate do calendário = hoje.",
    range: "future",
  },
  {
    id: "any",
    title: 'Range: "any"',
    description: "Sem restrições de data. Exibe todas as predefinições.",
    expected: "Todas as predefinições visíveis. Sem restrições de data no calendário.",
    range: "any",
  },
  {
    id: "customOnly",
    title: 'Range: "customOnly"',
    description: "Força apenas o seletor de datas personalizado. Sempre oculta o menu de predefinições.",
    expected: "Sem menu de predefinições. Apenas o seletor de calendário visível ao abrir. Sem restrições de data.",
    range: "customOnly",
  },
];

function ScenarioCard({ scenario }: { scenario: ScenarioProps }) {
  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("date", {
        id: "dateRange",
        header: "Date Range",
        cell: (info) => info.getValue(),
        enableColumnFilter: true,
        meta: {
          filter: {
            type: ColumnFilterType.DATE_RANGE,
            dateRangeOptions: {
              range: scenario.range,
            },
          },
        },
      }),
    ],
    [scenario.range]
  );

  const data = useMemo<DemoRow[]>(
    () => [
      { id: 1, name: "Demo Item 1", date: "2024-01-15" },
      { id: 2, name: "Demo Item 2", date: "2024-02-20" },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Get the column definition to pass to DateRangeFilter
  const dateRangeColumn = table.getAllColumns().find((col) => col.id === "dateRange");
  const columnMeta = dateRangeColumn?.columnDef.meta as
    | { filter?: { type: string; dateRangeOptions?: DateRangeFilterOptions } }
    | undefined;
  const dateRangeOptions = columnMeta?.filter?.dateRangeOptions;

  return (
    <div className="border-subtle mb-8 rounded-lg border p-6" data-testid={`drf-scenario-${scenario.id}`}>
      <h3 className="text-emphasis mb-2 text-lg font-semibold">{scenario.title}</h3>
      <p className="text-default mb-2 text-sm">{scenario.description}</p>
      <p className="text-subtle mb-4 text-xs">
        <strong>Esperado:</strong> {scenario.expected}
      </p>

      <div className="mt-4">
        <DataTableProvider tableIdentifier={`playground-date-range-${scenario.id}`}>
          {dateRangeColumn && (
            <DateRangeFilter
              column={{
                id: dateRangeColumn.id,
                title: dateRangeColumn.columnDef.header as string,
                type: "dr",
              }}
              options={dateRangeOptions}
              showColumnName={false}
              showClearButton={false}
            />
          )}
        </DataTableProvider>
      </div>
    </div>
  );
}

export default function DateRangeFilterPlayground() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-emphasis text-2xl font-bold">Playground — Filtro de Intervalo de Datas</h1>
        <p className="text-default mt-2">
          Esta página demonstra as diferentes opções de <code>range</code> do componente DateRangeFilter.
        </p>
        <p className="text-subtle mt-1 text-sm">
          A opção <code>range</code> controla tanto as restrições de data quanto a visibilidade das predefinições. A
          visibilidade das predefinições é derivada automaticamente com base nas predefinições compatíveis.
        </p>
      </div>

      {scenarios.map((scenario) => (
        <ScenarioCard key={scenario.id} scenario={scenario} />
      ))}
    </div>
  );
}
