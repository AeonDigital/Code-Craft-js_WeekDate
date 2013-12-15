 Code Craft - WeekDate
=======================

> [Aeon Digital](http://www.aeondigital.com.br)
>
> rianna@aeondigital.com.br


**Code Craft** é um conjunto de soluções front-end e outras server-side para a construção de aplicações web.
Tais soluções aqui apresentadas são a minha forma de compartilhar com a `comunidade online` parte do que aprendi 
(e continuo aprendendo) nos foruns, sites, blogs, livros e etc. assim como na experiência adquirida no contato
direto com profissionais e estudantes que, como eu, amam o universo `Web Developer` e nunca se dão por satisfeitos 
com seu nível atual de conhecimento.


## C.C. - WeekDate

**WeekDate** é uma namespace javascript que expõe métodos para lidar com datas no formato *Week ISO 8601*.


## ISO 8601

> Definição retirada da [Wikipédia](http://pt.wikipedia.org/wiki/ISO_8601).

A *ISO 8601* é uma norma internacional para representação de data e hora emitida pela 
[Organização Internacional para Padronização, ISO](http://www.iso.org/iso/home.html). 

**Especificamente esta norma define: **
> "Elementos de dados e formatos de intercâmbio para representação e manipulação de datas e horas". 
> A principal característica do formato de data e hora da norma ISO 8601 é que a informação de data 
> e hora seja ordenada a partir do valor mais significativo ou, em termos simples, do maior(ano) 
> para o menor (segundo).


### Métodos públicos

* `FirstWeekOfYear`         : Retorna um Date setado para a segunda feira da primeira semana do ano indicado.
* `LastWeekOfYear`          : Retorna um Date setado para a segunda feira da última semana do ano indicado.
* `WeeksInYear`             : Retorna o total de semanas existente no ano indicado [52 ou 53].
* `YearOfWeekDate`          : Retorna o Ano ao qual pertence a data da instancia Date indicada.
* `WeekNumberOfDate`        : Retorna o número da semana referente à data da instancia indicada.
* `DateOfWeek`              : Retorna um Date conforme parametros passados.
* `IsWeek`                  : Verifica se a String possui um formato válido.


**Importante**

Tenha em mente que em algumas vezes, neste e em outros projetos **Code Craft** optou-se de forma consciênte em 
não utilizar uma ou outra *regra de otimização* dos artefatos de software quando foi percebida uma maior vantagem para
a equipe de desenvolvimento em flexibilizar tal ponto do que extritamente seguir todas as regras de otimização.


### Compatibilidade

Não é intenção deste nem de outros projetos do conjunto de soluções **Code Craft** em manter 
compatibilidade com navegadores antigos (IE8<).


________________________________________________________________________________________________________________________



## Licença

Para este e outros projetos **Code Craft** é utilizada a [Licença GNUv3](LICENCE.md).
