const products = [                                              //массив с товарами
    { name: 'Футболка', type: 'clothing', height: 170 },
    { name: 'Джинсы', type: 'clothing', height: 175 },
    { name: 'Кроссовки', type: 'shoes', shoeSize: 42 },
    { name: 'Платье', type: 'clothing', height: 165 },
    { name: 'Шорты', type: 'clothing', height: 180 },
    { name: 'Пиджак', type: 'clothing', height: 185 },
    { name: 'Ботинки', type: 'shoes', shoeSize: 39 },
    { name: 'Свитшот', type: 'clothing', height: 170 },
    { name: 'Шапка', type: 'clothing', height: 58 },
    { name: 'Пальто', type: 'clothing', height: 175 },
    { name: 'Кроссовки Nike', type: 'shoes', shoeSize: 43 },
    { name: 'Платье вечернее', type: 'clothing', height: 160 },
    { name: 'Джоггеры', type: 'clothing', height: 170 },
    { name: 'Сапоги', type: 'shoes', shoeSize: 40 },
    { name: 'Брюки', type: 'clothing', height: 178 },
    { name: 'Пуховик', type: 'clothing', height: 170 },
    { name: 'Сандалии', type: 'shoes', shoeSize: 41 },
    { name: 'Блузка', type: 'clothing', height: 165 },
    { name: 'Футболка с принтом', type: 'clothing', height: 172 },
    { name: 'Туфли', type: 'shoes', shoeSize: 38 }
];


document.addEventListener('DOMContentLoaded', function () {
    const filterButton = document.getElementById('filter-btn'); //собрали в константы состояние кнопки Фильтровать, данные пользователя и div, в который все вставим
    const heightInput = document.getElementById('height');
    const shoeSizeInput = document.getElementById('shoe-size');
    const resultContainer = document.getElementById('result-container');

    const savedHeight = localStorage.getItem('userHeight'); //пытаемся выгрущить из локальной памяти информацию
    const savedShoeSize = localStorage.getItem('userShoeSize');

    if (savedHeight) { //если информация есть, испольщуем ее
        heightInput.value = savedHeight;
    }

    if (savedShoeSize) {
        shoeSizeInput.value = savedShoeSize;
    }



    
    filterButton.addEventListener('click', function () {
     
 
        const userHeight = parseFloat(heightInput.value); //выгружаем данные из инпутов в формат циферок
        
        const userShoeSize = parseInt(shoeSizeInput.value);

        if (isNaN(userHeight) || isNaN(userShoeSize)) { //защита от дурака, если одно поле пустое, сообщаем пользователю
            alert('Какое-то из полей осталось пустым, введите все данные.');
            return;
        }

        localStorage.setItem('userHeight', userHeight); //закругаем в локальную память данные пользователя
        localStorage.setItem('userShoeSize', userShoeSize);

        const filteredProducts = products.filter(function (product) { //метод фильтрации, все выбранные товары добавляем в массив
            if (product.type === 'clothing') { //если товат не обувь, то ищем нужный диапазон
                return product.height <= userHeight + 3 && product.height >= userHeight - 3 ; //выбирает вещи в диапозоне роста +- 3 см
            } else if (product.type === 'shoes') { //выбирает обувь точно по размеру пользователя
                return product.shoeSize === userShoeSize;
            }
        }); 
        

        if (filteredProducts.length === 0) //если массив после фильтрации пустой, нет подходящих товаров, сообщаем пользователю
        {
            resultContainer.innerHTML = 'Нет подходящих товаров.';
        } 
        else //если подходящие товары есть, создаем карточки и отображаем пользователю
        {
            resultContainer.innerHTML = '<h2>Подходящие товары:</h2>';
                
            filteredProducts.forEach(function (product) {
            const card = document.createElement('div');
            card.classList.add('product-card', 'col-lg-4',  'mb-3');
            
            card.innerHTML = `
                <div class="card-header">${product.name}</div>
                <div class="card-body">
                
                    <p class="card-text">${product.type === 'clothing' ? 'Рост: ' + product.height + ' см' : 'Размер обуви: ' + product.shoeSize}</p>
                </div>
            `;
            resultContainer.appendChild(card);
        });

            resultContainer.appendChild(grid);
        }
    });
});
