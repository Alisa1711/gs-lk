/* global svg4everybody */

$(document).ready(() => {
  const getChecked = (checkboxes) => {
    let checked = 0;
    checkboxes.each(function () {
      checked = $(this).prop('checked') ? checked += 1 : checked;
    });
    return checked;
  };

  $(() => {
    const ifPageTop = () => $(window).scrollTop() <= 1;
    const pageHeader = $('.page-header');
    const tableHeader = $('.table__header');

    $(window).on('scroll', () => {
      const pageHeaderHeight = `${pageHeader.outerHeight()}px`;
      if (ifPageTop()) {
        tableHeader.removeClass('table__header--scroll');
        pageHeader.removeClass('page-header--fix');
        $('body').removeAttr('style');
      } else {
        pageHeader.addClass('page-header--fix');
        tableHeader.addClass('table__header--scroll');
        $('body').css('padding-top', pageHeaderHeight);
      }
    });
  });


  $('.order__top').on('click', function () {
    $(this).parent('.order').toggleClass('order--expanded');
  });

  $('.account-menu__button, .account-menu__header, .account-menu__link').on('click', (evt) => {
    const menu = $('#account-menu__list');
    evt.stopPropagation();
    menu.slideToggle(300);

    $(document).on('click', function (e) {
      if (e.currentTarget !== menu) {
        menu.slideUp(300);
        $(this).unbind('click');
      }
    });
  });

  // модальные окна
  $(() => {
    $('button[data-modal], a[data-modal]').on('click', function () {
      const modal = $($(this).data('modal'));

      modal.fadeIn(200).find('input:first').focus();
      $('body').addClass('modal-opened');

      $('.modal, .modal__close').on('click', function (event) {
        if (event.target === this) {
          modal.fadeOut(200);
          $('body').removeClass('modal-opened');
        }
      });
    });

    $('.checkbox-action').on('change', function () {
      const group = $(this).closest('.modal');
      const checkboxes = group.find('.checkbox-action');
      const submitButton = group.find('.button--action');

      submitButton.prop('disabled', !getChecked(checkboxes));
    });
  });

  // Восстановление пароля
  $('.restore-password').on('click', () => {
    $('.login__form').hide();
    $('.login__restore-password').show();
    $('#mail').focus();
  });

  // Сортировка в таблице

  $('.sort__item').on('click', function () {
    if ($(this).hasClass('sort__item--active')) {
      $(this).toggleClass('sort__item--up');
    }
    $(this).addClass('sort__item--active').siblings().removeClass('sort__item--active sort__item--up');
  });

  // Чекбоксы в документах
  $(() => {
    const actions = $('.documents__actions');
    const downloadButton = $('.documents__download-all');
    const selectAllCheckbox = $('.select-all');
    let indeterminate = false;
    const checkboxes = $('.select-item');

    selectAllCheckbox.on('click', function () {
      if (indeterminate) {
        $(this).prop({
          indeterminate: false,
          checked: false
        });
      }
      checkboxes.prop('checked', $(this).prop('checked')).trigger('change');
      indeterminate = false;
    });

    checkboxes.on('change', function () {
      if (getChecked(checkboxes) === checkboxes.length) {
        selectAllCheckbox.prop({
          indeterminate: false,
          checked: true
        });
        indeterminate = false;
        downloadButton.removeClass('button-hide');
        actions.addClass('active');
      } else if (getChecked(checkboxes)) {
        selectAllCheckbox.prop({
          indeterminate: true,
          checked: false
        });
        indeterminate = true;
        downloadButton.removeClass('button-hide');
        actions.addClass('active');
      } else {
        selectAllCheckbox.prop({
          indeterminate: false,
          checked: false
        });
        indeterminate = false;
        downloadButton.addClass('button-hide');
        actions.removeClass('active');
      }
      $(this).closest('.documents__item').toggleClass('active', $(this).prop('checked'));
    });
  });

  // добавление даты в "Добавить заказ"
  $(() => {
    const addDate = $('.form__add-date');
    const fields = $('.form__date-time');
    const deleteDate = $('<button/>', {
      class: 'button icon--close form__input-close',
      type: 'button'
    });

    addDate.on('click', function () {
      const newFields = fields.clone();
      $(deleteDate).clone().appendTo(newFields);
      newFields
        .css('display', 'none')
        .insertBefore($(this))
        .slideDown(100);

      $('.form__input-close').on('click', function () {
        $(this).closest('.form__date-time').slideUp(100);
        $(this).closest('.form__date-time').remove(); // доделать
      });
    });
  });

  $('select').niceSelect();

  // select + input
  $(() => {
    const selectInput = $('.select-input');
    const input = $('.select-input__input');
    const select = $('div.select');

    $('li[data-value=add]').on('click', function () {
      $(this).closest(select).hide();
      $(this).closest(selectInput).find(input).focus();
    });

    $('.select-input__close').on('click', function () {
      $(this).closest(selectInput).find(select).show();
    });
  });

  // добавление нового адреса в заказе
  $(() => {
    const toggleForm = function () {
      $('.add-order__form').toggle();
      $('.add-order__add-address').toggle();
    };
    $('li[data-value=new-address], .add-order__cancel-button').on('click', () => {
      toggleForm();
    });
    $('.add-order__ready-button').on('click', () => {
      toggleForm();
      $('#select-address').next('.select').hide();
    });
  });

  // выбор количества исполнителей
  $(() => {
    const radio = $('.form__workers-count').prev('input[type=radio]');
    const otherButton = $('.form__workers-button');
    const countInput = $('.form__workers-input');

    radio.on('change', function () {
      if ($(this).prop('checked')) {
        countInput.fadeOut(200);
        otherButton.fadeIn(200);
      }
    });

    otherButton.on('click', function () {
      $(this).fadeOut(200);
      countInput.fadeIn(200).focus();
      radio.prop('checked', false);
    });
  });

  // отправка данных на почту
  $(() => {
    const checkboxToggle = $('.checkbox-input__toggle');

    $('.checkbox-input__input').slideToggle($(this).prev(checkboxToggle).prop('checked'));

    checkboxToggle.on('change', function () {
      const checkboxInput = $(this).closest('.checkbox-input').find('.checkbox-input__input');
      checkboxInput.slideToggle($(this).prop('checked'));
    });
  });


  svg4everybody(); // IE для svg-спрайта из внешнего файла
});
