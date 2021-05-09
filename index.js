/**
* Класс, объекты которого описывают параметры гамбургера. 
* 
* @constructor
* @param size        Размер
* @param stuffing    Начинка
*/
function Hamburger(size, stuffing) { 
    this.size = size
    this.stuffing = stuffing
 } 

/* Размеры, виды начинок и добавок */
Hamburger.SIZE_SMALL = { cost: 50, calories: 20 }
Hamburger.SIZE_LARGE = { cost: 100, calories: 40 }
Hamburger.STUFFING_CHEESE = { cost: 10, calories: 20 }
Hamburger.STUFFING_SALAD = { cost: 20, calories: 5 }
Hamburger.STUFFING_POTATO = { cost: 15, calories: 10 }

/**
 * Узнать размер гамбургера
 */
Hamburger.prototype.getSize = function () {
    return this.size
}

/**
 * Узнать начинку гамбургера
 */
Hamburger.prototype.getStuffing = function () {
    return this.stuffing
}

/**
 * Узнать цену гамбургера
 * @return {Number} Цена в тугриках
 */
Hamburger.prototype.calculatePrice = function () {
    return this.size.cost + this.stuffing.cost
}

/**
 * Узнать калорийность
 * @return {Number} Калорийность в калориях
 */
Hamburger.prototype.calculateCalories = function () {
    return this.size.calories + this.stuffing.calories
}


/**
* Класс, объекты которого описывают параметры салата. 
* 
* @constructor
* @param size        Размер
* @param stuffing    Начинка
*/
function Salad(name, grams) { 
    this.name = name
    this.grams = grams
 } 

 /* Виды салатов */
Salad.RUSSIAN_SALAD = { cost: 100, calories: 20 }
Salad.CAESAR = { cost: 50, calories: 80 }


/**
 * Узнать цену салатов
 * @return {Number} Цена в тугриках
 */
Hamburger.prototype.calculatePrice = function () {
    return this.name.cost * this.grams
}

/**
 * Узнать калорийность салатов
 * @return {Number} Калорийность в калориях
 */
Hamburger.prototype.calculateCalories = function () {
    return this.name.calories + this.grams
}