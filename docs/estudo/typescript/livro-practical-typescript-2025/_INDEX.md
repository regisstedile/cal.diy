---
title: "Практический TypeScript"
author: "Александр Герасимов"
year: 2025
tags: [book, typescript, programacao, desenvolvimento-web, javascript]
created: 2026-05-23
source_pdf: "/home/regis/Герасимов А. - Практический TypeScript - 2025.pdf"
pages: 238
---

# Практический TypeScript

## Estado da Organização

- **PDF analisado:** `/home/regis/Герасимов А. - Практический TypeScript - 2025.pdf`
- **Páginas:** 238
- **Autor:** Александр Герасимов
- **Perfil:** guia prático de 83 recomendações para escrever, migrar, publicar e manter TypeScript.
- **Uso no estudo:** complementar o livro Total TypeScript com regras pragmáticas para código enterprise.

## Índice Completo


### 🏗️ Основы TypeScript — Fundamentos TypeScript

- **01.** Como TypeScript está relacionado ao JavaScript  
  _Как TypeScript связан с JavaScript_
- **02.** Como escolher as opções certas no TypeScript  
  _Как выбирать нужные опции в TypeScript_
- **03.** Geração de código não depende de tipos  
  _Генерация кода не зависит от типов_
- **04.** O que é tipagem estrutural  
  _Что такое структурная типизация?_
- **05.** Como limitar o tipo any  
  _Как ограничить тип any_
- **06.** Como usar o editor para inspecionar o sistema de tipos  
  _Как использовать редактор для получения информации о системе типов_
- **07.** Tipos como conjuntos de valores  
  _Типы как множества значений_
- **08.** Como distinguir espaço de tipos e espaço de valores  
  _Как выражать принадлежность сущностей к пространству типов или пространству значений_
- **09.** Preferir anotações de tipo a assertions  
  _Как отдавать предпочтение аннотациям типов, а не утверждениям_
- **10.** Evitar tipos wrapper como String, Number e Boolean  
  _Как избегать объектных типов-оберток_

### 🔧 Система типов — Sistema de tipos

- **11.** Verificação de propriedades excedentes  
  _Проверка лишних свойств_
- **12.** Como tipar uma expressão de função inteira  
  _Как задать тип всему функциональному выражению_
- **13.** Diferenças entre type e interface  
  _Различия между type и interface_
- **14.** Readonly em TypeScript  
  _Readonly в TypeScript_
- **15.** Como usar operações de tipos  
  _Как использовать операции типов_
- **16.** Alternativas mais precisas para index signatures  
  _Используйте более точные альтернативы для сигнатур индексов_
- **17.** Evitar index signatures numéricas  
  _Избегайте использования числовых сигнатур индексов_
- **18.** Evitar anotações de tipo desnecessárias  
  _Не засорять код лишними аннотациями типов_
- **19.** Usar variáveis diferentes para tipos diferentes  
  _Используйте разные переменные для разных типов_
- **20.** O que é alargamento de tipos  
  _Что такое расширение типов в TypeScript_
- **21.** Por que criar objetos inteiros é melhor  
  _Почему лучше создавать объекты целиком_
- **22.** Narrowing de tipos  
  _Сужение типов_
- **23.** Consistência no uso de aliases  
  _Как быть последовательным с использованием псевдонимов_
- **24.** Usar contexto na inferência de tipos  
  _Как использовать контекст при выводе типов_
- **25.** Tipos evolutivos  
  _Эволюционирующие типы_
- **26.** Construções funcionais e bibliotecas para melhorar tipos  
  _Функциональные конструкции и библиотеки для улучшения работы с типами_
- **27.** Funções async em vez de callbacks  
  _Async-функции вместо обратных вызовов_
- **28.** Classes e currying para criar pontos de inferência  
  _Классы и каррирование для создания новых точек вывода типов_
- **29.** Modelagem de estados válidos  
  _Моделирование допустимых состояний_
- **30.** Conservador no envio, liberal no recebimento  
  _Будь консервативным в отправке, либеральным в приёме_

### 📝 Лучшие практики — Boas práticas

- **31.** Não repetir informação de tipo na documentação  
  _Не повторять информацию типа в документации_
- **32.** Evitar null/undefined em aliases de domínio  
  _Избегать включения null или undefined в псевдонимы типов_
- **33.** Levar null para a periferia dos tipos  
  _Вынесение null на периферию типов_
- **34.** Preferir union de interfaces  
  _Предпочитай объединения интерфейсов_
- **35.** Usar tipos mais estreitos em vez de string  
  _Использование более узких типов вместо string_
- **36.** Usar tipo separado para valores especiais  
  _Использовать отдельный тип для специальных значений_
- **37.** Limitar propriedades opcionais  
  _Ограничить использование опциональных свойств_
- **38.** Evitar parâmetros repetidos do mesmo tipo  
  _Избегайте повторяющихся параметров одного типа_
- **39.** Unificar tipos em vez de modelar demais  
  _Унификация типов, вместо моделирования_
- **40.** Melhor impreciso que incorreto  
  _Лучше неточно, чем недостоверно_
- **41.** Nomear tipos na linguagem do domínio  
  _Имена типов на языке предметной области задачи_
- **42.** Criar tipos a partir de APIs/especificações, não só dados  
  _Типы на основе API и спецификаций, а не данных_
- **43.** Usar any no menor escopo possível  
  _Использовать максимально узкий диапазон для типов any_
- **44.** Alternativas mais precisas para any  
  _Более точные варианты any_
- **45.** Esconder assertions inseguras em funções bem tipadas  
  _Скрывать небезопасные утверждения типов в хорошо типизированных функциях_
- **46.** unknown em vez de any  
  _unknown вместо any_
- **47.** Soluções type-safe em vez de modificação dinâmica  
  _Типобезопасные решения вместо динамической модификации_
- **48.** Evitar armadilhas de confiabilidade  
  _Избегайте ловушек надежности_
- **49.** Rastrear cobertura de tipos para evitar regressão  
  _Отслеживайте зону охвата типов_

### 🚀 Продвинутые типы — Tipos avançados

- **50.** Genéricos  
  _Обобщённые конструкции_
- **51.** Evitar parâmetros de tipo desnecessários  
  _Избегайте лишних параметров типа_
- **52.** Preferir conditional types a overloads quando adequado  
  _Лучше условные типы, чем перегруженные сигнатуры_
- **53.** Distribuição de unions  
  _Распределение объединений_
- **54.** Template literal types para DSLs e relações entre strings  
  _Шаблонные литеральные типы для DSL_
- **55.** Como escrever testes para tipos  
  _Как писать тесты для типов_
- **56.** Prestar atenção em mapped types  
  _Обращайте внимание на отображение типов_
- **57.** Preferir tipos genéricos com recursão de cauda  
  _Отдавайте предпочтение обобщенным типам с хвостовой рекурсией_
- **58.** Codegen como alternativa a tipos complexos  
  _Кодогенерация как альтернатива сложным типам_
- **59.** never para checagem de exaustividade  
  _Типы never для проверки полноты_
- **60.** Iteração por objetos  
  _Итерация по объектам_
- **61.** Record types para manter valores sincronizados  
  _Типы записей для синхронизации значений_
- **62.** Rest parameters e tuple types para funções variádicas  
  _Остаточные параметры и типы кортежа_
- **63.** Propriedades never opcionais para XOR  
  _Опциональные свойства never для XOR_
- **64.** Brands para tipagem nominal  
  _Маркировки для номинальной типизации_

### 📦 Публикация и API — Publicação e API

- **65.** TypeScript e @types em devDependencies  
  _TypeScript и @types в devDependencies_
- **66.** Verificar compatibilidade das três versões de declarações  
  _Проверять совместимость трех версий_
- **67.** Exportar todos os tipos que aparecem na API pública  
  _Экспортировать все типы публичного API_
- **68.** TSDoc para comentários de API  
  _TSDoc для комментариев к API_
- **69.** Definir tipo de this em callbacks quando fizer parte da API  
  _Определять тип this в обратных вызовах_
- **70.** Espelhar tipos para quebrar dependências  
  _Зеркалирование типов для разрыва зависимостей_
- **71.** Module augmentation para melhorar tipos  
  _Аугментацию модулей для улучшения типов_

### ⚡ Производительность и миграция — Performance e migração

- **72.** Preferir ECMAScript a features TypeScript-only  
  _ECMAScript перед TypeScript_
- **73.** Source maps para debug TypeScript  
  _Source Map для отладки TypeScript_
- **74.** Reconstruir tipos em runtime  
  _Реконструкция типов на стадии выполнения_
- **75.** Hierarquia DOM  
  _Иерархия DOM_
- **76.** Modelo preciso do ambiente de runtime  
  _Точная модель среды выполнения_
- **77.** Type checking e testes unitários  
  _Проверка типов и юнит-тестирование_
- **78.** Performance do compilador  
  _Быстродействие компилятора_
- **79.** Usar JavaScript moderno  
  _Использовать современный JavaScript_
- **80.** @ts-check e JSDoc no TypeScript  
  _@ts-check и JSDoc в TypeScript_
- **81.** allowJs para combinar TypeScript e JavaScript  
  _allowJs для совмещения TypeScript и JavaScript_
- **82.** Converter módulo por módulo subindo o grafo de dependências  
  _Конвертируйте модуль за модулем вверх по графу зависимостей_
- **83.** Não considerar migração concluída antes de ativar noImplicitAny  
  _Не считайте миграцию завершенной, пока не включите noImplicitAny_


## Conceitos-Chave Para o cal-diy

- Reduzir `any` e preferir `unknown` em fronteiras externas.
- Modelar estados válidos com discriminated unions.
- Usar `never` para exaustividade em switches.
- Preferir tipos de domínio com nomes do negócio.
- Manter `null` e `undefined` na periferia dos tipos.
- Derivar tipos de API/schema em vez de copiar formatos manualmente.
- Usar codegen quando tipos avançados ficarem complexos demais.
- Tratar migração TypeScript como incompleta enquanto `noImplicitAny` não estiver ativo.

## Relação Com Outros Materiais

- Frontend Masters: modelo mental e fundamentos narrados.
- Total TypeScript: livro estruturado com exercícios e capítulos formais.
- Практический TypeScript: checklist prático de decisões e armadilhas.

## Referência Local

- Plano aplicado: `../pocock-m-total-typescript-2026/90-plano-estudo-cal-diy-enterprise.md`
