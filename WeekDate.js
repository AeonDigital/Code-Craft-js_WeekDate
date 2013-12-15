/**
* @package Code Craft
* @pdesc Conjunto de soluções front-end.
*
* @module WeekDate
* @file Objeto para manipulação de datas em formato Week.
*
* @author Rianna Cantarelli <rianna.aeon@gmail.com>
*/















/**
* Classe que provê métodos de manipulação de datas em formato Week (ISO 8601).
*
* @class WeekDate
*
* @static
*
* @global
*/
var WeekDate = new (function () {
    /**
    * Adiciona "d" ao dia da instância atual.
    * Pode alterar os demais atributos da instância atual.
    * 
    * @function AddDays
    *
    * @memberof Date
    *
    * @param {Integer}                              d                   Dia.
    *
    * @return {Date}
    */
    Date.prototype.AddDays = function (d) {
        var o = this.Clone(); o.setDate(this.getDate() + d); return o;
    };

    /**
    * Clona um objeto Date.
    * 
    * @function Clone
    *
    * @memberof Date
    *
    * @return {Date}
    */
    Date.prototype.Clone = function () {
        return new Date(this.getTime());
    };

    /**
    * Retorna a diferença em dias entre as 2 instâncias Date.
    * 
    * @function DifferenceInDays
    *
    * @memberof Date
    *
    * @static
    *
    * @param {Date}                                 d1                  Primeira data.
    * @param {Date}                                 d2                  Segunda data.
    *
    * @return {Integer}
    */
    Date.DifferenceInDays = function (d1, d2) {
        return Math.round(Math.abs(d1 - d2) / 86400000);
    };

    /**
    * Retorna uma String para representar a instancia Date atual em formato "Week ISO 8601".
    * 
    * @function ToWeekFormat
    *
    * @memberof Date
    *
    * @argument {Boolean}                           [is]                Use "True" para informar que o "dia" deve entrar na formatação.
    * @argument {String}                            [f]                 Formato a ser usado para a data (week|weekbr).
    *
    * @return {String}
    */
    Date.prototype.ToWeekFormat = function (is, f) {
        var sR = '';

        var y = WeekDate.YearOfWeekDate(this);
        var n = WeekDate.WeekNumberOfDate(this);
        var d = this.getUTCDay();

        // Corrige semana com apenas 1 digito
        if (n.toString().length == 1) { n = '0' + n; }

        // Verifica set do dia da semana
        is = (is == undefined) ? true : is;
        f = (f == undefined) ? 'week' : f;

        if (f == 'week') {
            sR = y + '-W' + n;
            if (is) {
                if (d == '0') { d = '7'; }
                sR += '-' + d;
            }
        }
        else if (f == 'weekbr') {
            sR = n + 'W-' + y;
            if (is) {
                if (d == '0') { d = '7'; }
                sR = d + '-' + sR;
            }
        }

        return sR;
    };

    /**
    * Retorna um Date referente à string definida.
    * 
    * @function DateOfWeek
    *
    * @memberof Date
    *
    * @return {Date}
    */
    String.prototype.DateOfWeek = function () {
        return WeekDate.DateOfWeek(this);
    };



















    /**
    * Objeto de uma data week desmembrada.
    *
    * @class WeekMember
    *
    * @memberof WeekDate
    *
    * @private
    *
    * @property {Integer}                           year                Ano [1-9999].
    * @property {Integer}                           week                Número da semana [1-53].
    * @property {Integer}                           day                 Número do dia [1-7].
    */




    /**
    * Gera uma instância "WeekMember".
    *
    * @constructs
    *
    * @memberof WeekMember
    *
    * @param {String}                               sW                  Texto no formato week.
    */
    var WeekMember = function (sW) {
        var oR = {
            year: 0,
            week: 0,
            day: 0
        };

        if (WeekDate.IsWeek(sW)) {
            var wF = sW.toString().toLowerCase().replace('w', '').replace(/-/g, ' ').split(' ');

            if (wF.length == 2 || wF.length == 3) {

                if (wF.length == 2) { oR.day = 1; }

                if (wF[0].length == 4) {
                    oR.year = wF[0];
                    oR.week = wF[1];
                    if (wF.length == 3) { oR.day = wF[2]; }
                }
                else {
                    if (wF.length == 3) {
                        oR.year = wF[2];
                        oR.week = wF[1];
                        oR.day = wF[0];
                    }
                    else {
                        oR.year = wF[1];
                        oR.week = wF[0];
                    }
                }
            }
        }

        if(oR.year == 0 || oR.week == 0 || oR.day == 0) { oR = null; }
        else {
            oR.year = parseInt(oR.year, 10);
            oR.week = parseInt(oR.week, 10);
            oR.day = parseInt(oR.day, 10);
        }

        return oR;
    };



















    var static = {
        /**
        * Retorna um Date setado para a segunda feira da primeira semana do ano indicado.
        * 
        * @function FirstWeekOfYear
        *
        * @memberof WeekDate
        *
        * @static
        *
        * @param {Integer}                          y                  Ano.
        *
        * @return {Date}
        */
        FirstWeekOfYear: function (y) {
            var o = new Date(y, 0, 1);
            // Vai até a primeira quinta feira do ano.
            o = o.AddDays((parseInt((11 - o.getDay()) % 7, 10)));
            // Move até a segunda feira anterior
            return o.AddDays(-3);
        },

        /**
        * Retorna um Date setado para a segunda feira da última semana do ano indicado.
        * 
        * @function LastWeekOfYear
        *
        * @memberof WeekDate
        *
        * @static
        *
        * @param {Integer}                          y                  Ano.
        *
        * @return {Date}
        */
        LastWeekOfYear: function (y) {
            var o = this.FirstWeekOfYear(y + 1);
            return o.AddDays(-7);
        },

        /**
        * Retorna o total de semanas existente no ano indicado [52 ou 53].
        * 
        * @function WeeksInYear
        *
        * @memberof WeekDate
        *
        * @static
        *
        * @param {Integer}                          y                  Ano.
        *
        * @return {Date}
        */
        WeeksInYear: function (y) {
            var lW = this.LastWeekOfYear(y);
            lW = lW.AddDays(7);
            return (Date.DifferenceInDays(lW, this.FirstWeekOfYear(y)) / 7);
        },

        /**
        * Retorna o Ano ao qual pertence a data da instancia Date indicada.
        * 
        * @function YearOfWeekDate
        *
        * @memberof WeekDate
        *
        * @static
        *
        * @param {Date}                             d                   Objeto Date que será averiguado.
        *
        * @return {Integer}
        */
        YearOfWeekDate: function (d) {
            var iR = d.getFullYear();

            // Apenas se estiver na zona não identificada efetua calculos
            if ((d.getMonth() == 0 && d.getDate() <= 3) || (d.getMonth() == 11 && d.getDate() >= 29)) {
                // Identifica o último dia do ano corrente
                var lD = this.LastWeekOfYear(iR);
                lD = lD.AddDays(6);

                // Se a data atual é maior que o ultimo dia do ano corrente, a data
                // pertence ao próximo ano
                if (d > lD) { iR++; }
                // Senão, deve testar se a data pertence ao ano anterior.
                else {
                    // Identifica o último dia do ano anterior e se a data for igual
                    // ou posterior é por que pertence ao ano anterior.
                    lD = this.LastWeekOfYear(iR - 1);
                    lD = lD.AddDays(6);

                    if (d <= lD) { iR--; }
                }
            }

            return iR;
        },

        /**
        * Retorna o número da semana referente à data da instancia indicada.
        * 
        * @function WeekNumberOfDate
        *
        * @memberof WeekDate
        *
        * @static
        *
        * @param {Date}                             d                   Objeto Date que será averiguado.
        *
        * @return {Integer}
        */
        WeekNumberOfDate: function (d) {
            return parseInt(((Date.DifferenceInDays(this.FirstWeekOfYear(this.YearOfWeekDate(d)), d) / 7) + 1), 10);
        },

        /**
        * Retorna um Date conforme parametros passados.
        *
        * @function DateOfWeek
        *
        * @memberof WeekDate
        *
        * @static
        *
        * @param {String}                           sW                  Texto no formato week.
        * @argument {Integer}                       [y]                 Ano.
        * @argument {Integer}                       [n]                 Número da semana do respectivo ano.
        * @argument {Integer}                       [d]                 Número do dia da semana.
        *
        * @example Exemplos de uso :
        * var oDate = DateOfWeek(sW);
        * ou
        * var oDate = DateOfWeek(y, n, [d]);
        *
        * @return {Date}
        */
        DateOfWeek: function (sW) {
            var oD = null;

            if (arguments.length === 1) {
                // Se for uma string no formato week...
                if (this.IsWeek(sW)) {
                    // Desmembra a week
                    var wM = WeekMember(sW);
                    oD = this.DateOfWeek(wM.year, wM.week, wM.day);
                }
            }
            else {
                // ANO - Corrige valor fora dos limites válidos
                var y = (arguments[0] > 9999) ? 9999 : arguments[0];
                y = (y < 1) ? 1 : y;

                // SEMANA - Corrige valor fora dos limites válidos
                var mW = this.WeeksInYear(y);

                var n = arguments[1];
                n = (n < 1) ? 1 : ((n > mW) ? mW : n);

                // Verifica set do dia da semana
                var d = (arguments.length == 3) ? arguments[2] : 1;

                // DIA - Corrige valor fora dos limites válidos
                d = (d < 1) ? 1 : ((d > 7) ? 7 : d);

                // Seta instância para o primeiro dia da primeira semana do ano alvo
                oD = this.FirstWeekOfYear(y);

                // Calcula quantidade de dias passados
                oD = oD.AddDays(parseInt(((n - 1) * 7) + d - 1, 10));
            }

            return oD;
        },

        /**
        * Verifica se a String possui um formato válido.
        * 
        * @function IsWeek
        *
        * @memberof WeekDate
        *
        * @static
        *
        * @param {String}                           sW                  Texto no formato week.
        *
        * @return {Boolean}
        */
        IsWeek: function (sW) {

            if (sW.length == 7 || sW.length == 9 ||
        	    (sW.toLowerCase().indexOf('w') != -1 && (sW.length == 8 || sW.length == 10))) {

                var wF = sW.toString().toLowerCase().replace('w', '').replace(/-/g, ' ').split(' ');

                if (wF.length == 2 || wF.length == 3) {
                    var y = null;
                    var n = null;
                    var d = null;

                    if (wF.length == 2) { d = 1; }

                    if (wF[0].length == 4) {
                        y = wF[0];
                        n = wF[1];
                        if (wF.length == 3) { d = wF[2]; }
                    }
                    else {
                        if (wF.length == 3) {
                            y = wF[2];
                            n = wF[1];
                            d = wF[0];
                        }
                        else {
                            y = wF[1];
                            n = wF[0];
                        }
                    }

                    // Encontrando os atributos da data, testa se ela é verdadeira
                    if (!isNaN(y) && !isNaN(n) && !isNaN(d)) {
                        // Se o dia está dentro do intervalo correto
                        if (d >= 1 && d <= 7) {
                            // Se a semana for um numeral correto
                            if (n >= 1 && n <= 52 || (n == 53 && this.LastWeekOfYear(y) == 53)) {
                                return true;
                            }
                        }
                    }
                }
            }

            return false;
        }
    };


    return static;
});