/**
 * Класс для описания позиции в заказе
 * 
 * @constructor
 * @param {Object} item 
 */
function MenuItem(item) {
    if (!item) {
        throw new Error('There is not valid order position')
    }
    this.item = item
}

/**
 * @return {Object} Позиция
 */
MenuItem.prototype.getItem = function() {
    return item
}

/**
 * @return {Number} Стоимость
 */
MenuItem.prototype.getItemPrice = function() {
    return this.item.cost
}

/**
 * @return {Number} Калории
 */
MenuItem.prototype.getItemCalories = function() {
    return this.item.calories
}


/**
* Класс, объекты которого описывают параметры гамбургера. 
* 
* @constructor
* @param size        Размер
* @param stuffing    Начинка
*/
function Hamburger(size, stuffing) { 
    if (!stuffing) {
        throw new Error('The stuffing is required')
    }
    this.size = new MenuItem(size)
    this.stuffing = new MenuItem(stuffing)
} 

/* Размеры, виды начинок и добавок */
Hamburger.SIZE_SMALL = { cost: 50, calories: 20 }
Hamburger.SIZE_LARGE = { cost: 100, calories: 40 }
Hamburger.STUFFING_CHEESE = { cost: 10, calories: 20 }
Hamburger.STUFFING_SALAD = { cost: 20, calories: 5 }
Hamburger.STUFFING_POTATO = { cost: 15, calories: 10 }

/**
 * Узнать размер гамбургера
 * @return {MenuItem} Размер
 */
Hamburger.prototype.getSize = function () {
    return this.size
}

/**
 * Узнать начинку гамбургера
 * @return {MenuItem} Начинка
 */
Hamburger.prototype.getStuffing = function () {
    return this.stuffing
}

/**
 * Узнать цену гамбургера
 * @return {Number} Цена в тугриках
 */
Hamburger.prototype.calculatePrice = function () {
    return this.getSize().getItemPrice() + this.getStuffing().getItemPrice()
}

/**
 * Узнать калорийность
 * @return {Number} Калорийность в калориях
 */
Hamburger.prototype.calculateCalories = function () {
    return this.getSize().getItemCalories() + this.getStuffing().getItemCalories()
}



/**
* Класс, объекты которого описывают параметры салата. 
* 
* @constructor
* @param item     Позиция
* @param grams    Граммы
*/
function Salad(item,grams) { 
    MenuItem.call(this, item)
    this.grams = grams
} 

 /* Виды салатов */
Salad.RUSSIAN_SALAD = { cost: 100, calories: 20 }
Salad.CAESAR = { cost: 50, calories: 80 }
Salad.PRICE_PER_GRAMMS = 100

Salad.prototype = Object.create(MenuItem.prototype)
Salad.constructor = Salad;


/**
 * Узнать цену салатов
 * @return {Number} Цена в тугриках
 */
Salad.prototype.calculatePrice = function () {
 
    return this.getItemPrice() * (this.grams/Salad.PRICE_PER_GRAMMS)
}

/**
 * Узнать калорийность салатов
 * @return {Number} Калорийность в калориях
 */
Salad.prototype.calculateCalories = function () {

    return this.getItemCalories() * (this.grams/Salad.PRICE_PER_GRAMMS)
}


/**
* Класс, объекты которого описывают параметры напитка. 
* 
* @constructor
* @param item   Позиция
* 
*/
function Drink(item) { 
    MenuItem.call(this,item)
} 

Drink.prototype = Object.create(MenuItem.prototype)
Drink.constructor = Drink;

 /* Виды напитков */
Drink.COLA = { cost: 50, calories: 40 }
Drink.COFFE = { cost: 80, calories: 20 }


/**
 * Узнать цену напитка
 * @return {Number} Цена в тугриках
 */
Drink.prototype.calculatePrice = function () {
    return this.getItemPrice()
}

/**
 * Узнать калории напитка
 * @return {Number} Калорийность в калориях
 */
Drink.prototype.calculateCalories = function () {
    return this.getItemCalories()
}

/**
* Класс, объекты которого описывают параметры заказа. 
* 
* @constructor 
*/
function Order() { 
    this.positions = []
    this._isPaid = false
} 

/**
 * Добавить позицию в заказ
 * @return {void} 
 */
Order.prototype.addPosition = function(position) {
    this.positions.push(position)
}

/**
 * Удалить позицию из заказа
 * @return {void} 
 */
Order.prototype.deletePosition = function(position) {
    if (this.positions.length === 0) {
         throw new Error('There is no positions in order')
    }
    this.positions =  this.positions.filter(function(item) {
        return JSON.stringify(position) !== JSON.stringify(item)
    })

}

/**
 * Оплатить заказ
 * @return {void} 
 */
Order.prototype.pay = function() {
    if (this._isPaid) {
        throw new Error('Order is already paid')
    }
    if (this.positions.length === 0) {
        throw new Error('There is no positions in order')
    }
    this._isPaid = true
    Object.freeze(this.positions)
}



/**
 * Пример создания заказа
 */

const order = new Order();

/**
 * Создаем гамбургер
 */

const hamburger = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_CHEESE)
console.log(hamburger.calculateCalories())
console.log(hamburger.calculatePrice())

/**
 * Добавляем гамбургер в заказ
 */
order.addPosition(hamburger)

/**
 * Создаем салат
 */
const salad =  new Salad(Salad.RUSSIAN_SALAD, 200)
console.log(salad.calculateCalories())
console.log(salad.calculatePrice())

/**
 * Добавляем салат в заказ
 */
order.addPosition(salad)


/**
 * Создаем напиток
 */
const drink = new Drink(Drink.COLA)
console.log(drink.calculatePrice())
console.log(drink.calculateCalories())

/**
 * Добавляем напиток в заказ
 */
order.addPosition(drink)
console.log(order)
/**
 * Удаляем напиток из заказа
 */
order.deletePosition(drink)
console.log(order)

/**
 * Оплачиваем заказ
 */
order.pay()

/**
 * Удаляем салат и гамбургер из заказа
 */
order.deletePosition(salad)
order.deletePosition(hamburger)

/**
 * Оплачиваем заказ
 */
order.pay()