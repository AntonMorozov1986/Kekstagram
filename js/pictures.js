'use strict';

const MIN_OF_LIKES = 15;
const MAX_OF_LIKES = 200;
const MIN_LENGTH_OF_COMMENT = 1;
const MAX_LENGTH_OF_COMMENT = 2;
const MAX_NUMBER_OF_COMMENTS = 6;
const USER_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const PHOTO_DESCRIPTION = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
const NUMBER_OF_USER_PHOTOS = 26;


//
/**
 * Конструктор объектов фотографий пользователей
 */
class UserPhoto {
  constructor(numberOfPhoto) {
    this.url = `photos/${numberOfPhoto}.jpg`;
    this.likes = getRandomNumberInInterval(MIN_OF_LIKES, MAX_OF_LIKES);
    this.comments = getComment();
    this.description = getDescription();
  }
}

/**
 * Функция возвращает случайное число в заданном диапазоне включая крайние значения
 * @param {number} min
 * @param {number} max
 * @return {*}
 */
let getRandomNumberInInterval = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Функция возвращает произвольнгый комментарий пользователя
 * @return {[]}
 */
let getComment = function() {
  let userComment = [];
  let commentLength = getRandomNumberInInterval(MIN_LENGTH_OF_COMMENT, MAX_LENGTH_OF_COMMENT);
  let numberOfComments = getRandomNumberInInterval(1, MAX_NUMBER_OF_COMMENTS);
  for (let commentNumber = 1; commentNumber <= numberOfComments; commentNumber++) {
    let comment = '';
    for (let i = 0; i < commentLength; i++) {
      comment += USER_COMMENTS[getRandomNumberInInterval(0, USER_COMMENTS.length - 1)] + ' ';
    }
    userComment.push(comment);
  }
  return userComment;
}

/**
 * Функция возвращает случайное описание фото
 * @return {string}
 */
let getDescription = function() {
  return PHOTO_DESCRIPTION[getRandomNumberInInterval(0,PHOTO_DESCRIPTION.length - 1)];
}

let getUserPhotos = function(numberOfPhotos) {
  let arrayOfPhotos = [];
  for (let i = 1; i <= numberOfPhotos; i++) {
    arrayOfPhotos.push(new UserPhoto(i));
  }
  return arrayOfPhotos;
}

/**
 * Функция возвращает фрагмент DOM с картинками
 * @param arrayOfUserPhotos
 * @return {DocumentFragment}
 */
let getPictureFragment = function(arrayOfUserPhotos) {
  let pictureTemplateEl = document.querySelector('#picture-template').content.querySelector('.picture');
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < arrayOfUserPhotos.length; i++) {
    let photosEl = pictureTemplateEl.cloneNode(true);
    photosEl.querySelector('img').src = arrayOfUserPhotos[i].url;
    photosEl.querySelector('.picture-stats .picture-likes').textContent = arrayOfUserPhotos[i].likes;
    photosEl.querySelector('.picture-stats .picture-comments').textContent = arrayOfUserPhotos[i].comments;
    fragment.appendChild(photosEl);
  }
  return fragment;
}

/**
 * Функция показывает большое изображение выбранного фото
 * @param numberOfPhoto
 */
let showGalleryOverlay = function(numberOfPhoto) {
  let galleryOverlayEl = document.querySelector('.gallery-overlay');
  galleryOverlayEl.querySelector('img').src = userPhotos[numberOfPhoto].url;
  galleryOverlayEl.querySelector('.likes-count').textContent = userPhotos[numberOfPhoto].likes;
  galleryOverlayEl.querySelector('.comments-count').textContent = userPhotos[numberOfPhoto].comments.length.toString();
  galleryOverlayEl.classList.remove('hidden');
}

let userPhotos = getUserPhotos(NUMBER_OF_USER_PHOTOS);
let pictureFragment = getPictureFragment(userPhotos);
let picturesEl = document.querySelector('.pictures');
picturesEl.appendChild(pictureFragment);

// showGalleryOverlay(0);

// let galleryOverlayEl = document.querySelector('.gallery-overlay');

