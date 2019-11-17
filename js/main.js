$(document).ready(function () {
    "use strict";

    var window_width = $(window).width(),
        window_height = window.innerHeight,
        header_height = $(".default-header").height(),
        header_height_static = $(".site-header.static").outerHeight(),
        fitscreen = window_height - header_height;

    function testimonials_slider() {
        if ($('.testi-slider').length) {
            $('.testi-slider').owlCarousel({
                loop: true,
                margin: 30,
                items: 1,
                nav: false,
                autoplay: 2500,
                smartSpeed: 1500,
                dots: false,
                responsiveClass: true,
                thumbs: true,
                thumbsPrerendered: true
            })
        }
    }
    testimonials_slider();

    var current_admin_menu_testi_slider_item_index = 0

    function admin_menu_testi_slider() {
        if ($('.admin-menu-testi-slider').length) {
            $('.admin-menu-testi-slider').owlCarousel({
                loop: true,
                items: 1,
                autoplay: 2500,
                smartSpeed: 1500,
                onChange: function( e ){
				    var index = ( 1 + ( e.property.value - Math.ceil( e.item.count / 2 ) ) % e.item.count || 0 ) || 1;
				    console.log(index);
				    current_admin_menu_testi_slider_item_index = index-1;
				}
            })
        }
    }
    admin_menu_testi_slider();

    if ($(window).width() < 1200) {
        $('.s-media').addClass('ml-auto');
        $('.footer-area .menu').removeClass('col-5');
        $('.footer-area .menu').addClass('col-6');

        $('.about-cont div').removeClass('col-6');
        $('.about-cont div').addClass('col-12');

        $('.occup-items').removeClass('col-9');
        $('.occup-items').addClass('col-8');

        $('.add-occupations').removeClass('col-3');
        $('.add-occupations').addClass('col-4');
    };


    if ($(window).width() < 992) {
        $('.menu-tel').removeClass('col-3');
        $('.menu-tel').addClass('col-4');

        $('.navbar-toggler').click(function() {
            $('.menu').toggle();
            $('.menu a').click(function () {
                $('.menu').css('display', 'none');
            });
        });

        $('.menu').removeClass('col-7');

        $('.hero-cont').removeClass('col-7');
        $('.hero-cont').removeClass('col');

        $('.footer-area .menu').removeClass('col-6');
        $('.footer-area .menu').addClass('col-7');

        $('.s-media').removeClass('col-2');
        $('.s-media').addClass('col-3');

        $('.s-media').removeClass('col-3');
        $('.s-media').addClass('col-6');

        $('.f-logo').removeClass('col-3');
        $('.f-logo').addClass('col-6');

        $('.footer-area .menu').removeClass('col-7');
        $('.footer-area .menu').addClass('col');

        $('.bottom div').removeClass('col-6');
        $('.bottom div').addClass('col-12');

        $('.specialist-row > div').removeClass('col-2');
        $('.specialist-row > div').addClass('col-4');

        $('.calendar-col').removeClass('col-4');
        $('.calendar-col').addClass('col-6');

        $('.work-col').removeClass('col-5');
        $('.work-col').addClass('col-6');

        $('.register-body .register-btn').removeClass('col-3');
        $('.register-body .register-btn').addClass('col-4');

        $('.occup-items').removeClass('col-8');
        $('.occup-items').addClass('col-7');

        $('.add-occupations').removeClass('col-4');
        $('.add-occupations').addClass('col-5');

        $('.occupations-col').removeClass('col-4');
        $('.occupations-col').addClass('col-6');
    };

    if ($(window).width() < 768) {
        $('.menu-tel').removeClass('col-4');
        $('.menu-tel').addClass('col-8');

        $('.modal-content').removeClass('col-7');
        $('.modal-content').addClass('col-12');

        $('.procedure-col').removeClass('col-5');
        $('.procedure-col').addClass('col-12');

        $('.specialist-row > div').removeClass('col-4');
        $('.specialist-row > div').addClass('col-6');

        $('.calendar-col').removeClass('col-6');
        $('.calendar-col').addClass('col-12');

        $('.work-col').removeClass('col-6');
        $('.work-col').addClass('col-12');

        $('.register-body .register-btn').removeClass('col-4');
        $('.register-body .register-btn').addClass('col-12');

        $('.occup-items').removeClass('col-7');
        $('.occup-items').addClass('col-12');

        $('.add-occupations').removeClass('col-5');
        $('.add-occupations').addClass('col-12');
    };

    if ($(window).width() < 370) {
        $('.occupations-col').removeClass('col-6');
        $('.occupations-col').addClass('col-12');
    }

    if ($(window).width() < 360) {
        $('.specialist-row > div').removeClass('col-6');
        $('.specialist-row > div').addClass('col-12');
    };

    $('.sl').slick({
        autoplay: true,
        autoplaySpeed: 1250,
        slidesToShow: 3,
        pauseOnFocus: false,
        pauseOnHover: false,
        responsive: [{
            breakpoint: 800,
            settings: {
                slidesToShow: 2,
                arrows: false
            },
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                arrows: false
            }
        }]
    });

    $('.modal-form .primary-btn').click(function (e) {
        e.preventDefault();
        $('.modal-form').css('display', 'none');
        $('.modal-succes').css('display', 'block');
        $('.modal-content').css('border', '1px solid #f4587e')
    });

    $('.modal-close').click(function (e) {
        e.preventDefault();
        $('.bg-modal').css('display', 'none');
    });

    var occupations = [];
    var specialists_info = {};

    // Open add-specialist modal
    $('.add-specialist-clickable').click(function (e) {
        e.preventDefault();
        insertOccupations($('#add-specialist-modal #specialist-occupation'));
        $('#add-specialist-modal').css('display', 'block');
    });

    // Close add-specialist modal
    $('#add-specialist-modal .modal-close').click(function (e) {
        e.preventDefault();
        $('#add-specialist-modal').css('display', 'none');
        $(".add-specialist-clickable img").css("border", "none");
    });

    // Open edit-specialist modal
	$('body').on('click', '.admin-menu .specialist', function (e) {
        e.preventDefault();
        if ($(this).hasClass("add-specialist-clickable")) {
        	return
        }
        insertOccupations($('#edit-specialist-modal #specialist-occupation'));
        $('#edit-specialist-modal').css('display', 'block');
        $(this).addClass("selected-specialist");
        load_spec_info($(this));
	});

    // Close edit-specialist modal
    $('#edit-specialist-modal .modal-close').click(function (e) {
        e.preventDefault();
        $('#edit-specialist-modal').css('display', 'none');
        $(".selected-specialist img").css("border", "none");
        $(".selected-specialist").removeClass("selected-specialist");
    });

    // Delete testimonial
    $('#btn-delete-testi').click(function (e) {
        e.preventDefault();
	    $('.owl-carousel').owlCarousel('remove', current_admin_menu_testi_slider_item_index).owlCarousel('update').trigger('refresh.owl.carousel');
    });

    function getOccupations() {
	    $('.occupation-item span').each(function(i){
    		occupations.push($(this).text().trim());
	    });
    }
    getOccupations();

    function insertOccupations(elem) {
        $(elem).empty();
		$.each(occupations, function(i, value) {
		     $(elem)
		         .append($("<option></option>")
	                    .attr("value",i)
	                    .text(value)); 
		});
    }

    // Add occupation

    if ($(window).width() > 993) {
        $('.add-occupation-btn').click(function (e) {
            e.preventDefault();
            $('body').find('.occupation-add-error').remove();
    
            var new_occupation = $('#new-occupation').val();
            if (new_occupation.trim() == "") {
                var elem_html = `<div class="occupation-add-error">Введите название специальности!</div>`
                $(".add-occupations").append(elem_html);
                return
            }
            var elem_html = `<div class="col-4 occupations-col"><div class="occupation-item"><span>${new_occupation}</span><i class="fas fa-times"></i></div></div>`;
            $(".occupations-items-row").append(elem_html);
            $('#new-occupation').val("");
            occupations.push(new_occupation);
        });
    }


    if ($(window).width() > 371 && $(window).width() < 994) {
        $('.add-occupation-btn').click(function (e) {
            e.preventDefault();
            $('body').find('.occupation-add-error').remove();
    
            var new_occupation = $('#new-occupation').val();
            if (new_occupation.trim() == "") {
                var elem_html = `<div class="occupation-add-error">Введите название специальности!</div>`
                $(".add-occupations").append(elem_html);
                return
            }
            var elem_html = `<div class="col-6 occupations-col"><div class="occupation-item"><span>${new_occupation}</span><i class="fas fa-times"></i></div></div>`;
            $(".occupations-items-row").append(elem_html);
            $('#new-occupation').val("");
            occupations.push(new_occupation);
        });
    }

    if ($(window).width() < 370) {
        $('.add-occupation-btn').click(function (e) {
            e.preventDefault();
            $('body').find('.occupation-add-error').remove();
    
            var new_occupation = $('#new-occupation').val();
            if (new_occupation.trim() == "") {
                var elem_html = `<div class="occupation-add-error">Введите название специальности!</div>`
                $(".add-occupations").append(elem_html);
                return
            }
            var elem_html = `<div class="col-12 occupations-col"><div class="occupation-item"><span>${new_occupation}</span><i class="fas fa-times"></i></div></div>`;
            $(".occupations-items-row").append(elem_html);
            $('#new-occupation').val("");
            occupations.push(new_occupation);
        });
    }

    // Delete occupation
    $('body').on('click', '.occupation-item i', function (e) {
        e.preventDefault();
        var occupation = $(this).parent().find("span").text().trim();
        var index = occupations.indexOf(occupation);
        if (index > -1) {
          occupations.splice(index, 1);
        }
        console.log(occupations);
        $(this).parent().parent().remove();
    });

    $('.add-specialist').click(function (e) {
        e.preventDefault();
        var specialists_cnt = $("specialist-row").children().length;
        var new_spec_ix = specialists_cnt+1;
        var new_spec_info = {
        	name: $("#add-specialist-modal #specialist-name").val(),
        	info: $("#add-specialist-modal textarea").val(),
        	phone: $("#add-specialist-modal #specialist-phone").val(),
        	occupation: $("#add-specialist-modal #specialist-occupation").val()
        };
        var col_w = 0;
        if ($(window).width() < 992) {
        	col_w = 6;
        } else {
        	col_w = 2
        }
        var elem_html = `
        <div class="col-${col_w}">
          <div class="specialist">
            <div class="specialist__overlay-wrapper">
                <img src="img/specialist3.jpg" alt="">
                <div class="specialist__overlay">
                    <p class="specialist__edit">Редагувати</p>
                </div>
            </div>

            <h5 class="specialist__name">${new_spec_info["name"]}</h5>
          </div>
        </div>
        `
        var children_cnt = $(".specialist-row").children().length
        $(".specialist-row").children().eq(children_cnt-2).after(elem_html);
        specialists_info[new_spec_ix] = new_spec_info;
        $('#add-specialist-modal').css('display', 'none');
        $(".add-specialist-clickable img").css("border", "none");
    });

    $('.save-specialist').click(function (e) {
        e.preventDefault();
        var specialists_cnt = $(".specialist-row").children().length;
        var spec_elem_ix = $(".selected-specialist").parent().index();
        var spec_info = {
        	name: $("#edit-specialist-modal #specialist-name").val(),
        	info: $("#edit-specialist-modal textarea").val(),
        	phone: $("#edit-specialist-modal #specialist-phone").val(),
        	occupation: $("#edit-specialist-modal #specialist-occupation").val()
        };
        specialists_info[spec_elem_ix] = spec_info;
        $(".specialist").eq(spec_elem_ix).find(".specialist__name").text(spec_info["name"]);
        $(".specialist").eq(spec_elem_ix).find("img").attr("src", "img/specialist3.jpg");
        $('#edit-specialist-modal').css('display', 'none');
        $(".selected-specialist img").css("border", "none");
        $(".selected-specialist").removeClass("selected-specialist");

    });

    $('.delete-specialist').click(function (e) {
        e.preventDefault();
        $(".selected-specialist").parent().remove();
        $('#edit-specialist-modal').css('display', 'none');
    });

    function load_spec_info(spec_elem) {
    	var ix = spec_elem.parent().index();
    	var info = specialists_info[ix];

    	if (info == undefined) {
	    	$("#edit-specialist-modal #specialist-name").val(spec_elem.find(".specialist__name").text());
	    	$("#edit-specialist-modal textarea").val("Очень приятный салон! Хожу сюда на чистку лица и маникюр. Мастера хорошие, умеют работать с кожей. Атмосфера приятная, помогает расслабиться. Салоном очень довольна, приятное место.");
	    	$("#edit-specialist-modal #specialist-phone").val("+380 99 229 3992");
	    	//$("#edit-specialist-modal #specialist-occupation").val('Косметолог').prop('selected', true);
            $("#edit-specialist-modal #specialist-occupation").val(0).change();

    		return
    	}
    	$("#edit-specialist-modal #specialist-name").val(info["name"]);
    	$("#edit-specialist-modal textarea").val(info["info"]);
    	$("#edit-specialist-modal #specialist-phone").val(info["phone"]);
    	$("#edit-specialist-modal #specialist-occupation").val(info["occupation"]);
    }

});   

$("body").on('click', '[href*="#"]', function(e){
    var fixed_offset = 0;
    $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 1000);
    e.preventDefault();
});

$(function () {
    $(".arrow-up").click(function(e){
        e.preventDefault();
        $('html, body').animate({scrollTop: 0},750);
        return false;
    });
});


$('.procedure input[type=checkbox]').change(function(e){
    if ($('.procedure input[type=checkbox]:checked').length > 3) {
        $(this).prop('checked', false);
        alert('Вы можете выбрать максимум 3 процедуры!');
    }
});

$('.specialist').click(
    function(){
    $(this).find(":radio").attr("checked","checked");
});

$('.specialist').click(function () {
    $('.specialist img').each(function () {
        $(this).css('border', 'none');
    });
    $(this).find('img').css('border', '2px solid #f03f69');
});

$('.work-time input[type=checkbox]').change(function(e){
    if ($('.work-time input[type=checkbox]:checked').length > 1) {
        $(this).prop('checked', false);
    }
});

$(function () {
    $('.register-btn a').click(function (e) {
        e.preventDefault();
        $('.register-body').find('.bg-modal').css('display', 'flex');
        $('.modal-content').css('border', '1px solid #f4587e');
    });

    $('.register-body .modal-close').click(function (e) {
        e.preventDefault();
        $('.register-body .bg-modal').css('display', 'none');
    });
});

let calendar = new vanillaCalendar({
  selector: "#calendar",
  months: ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"],
  shortWeekday: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд', ],
});