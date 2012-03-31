$(window).load(function(){
	var init_screen = $('#init_screen');
	var result_screen = $('#result_screen');
	var other_screen = $('#other_screen');
	var btn_yes = $('#btn_yes');
	var btn_no = $('#btn_no');
	var load_btn = $('#load_btn');
	var search = $('#search');
	var search_btn = $('#search_btn');
	var to_top = $('#to_top');
	var pict = $('#pict');
	var search_txt = 'けいおん';
	var current_page  = 1;

	var load_pict = function(txt){
		$.getJSON("http://api.flickr.com/services/rest/?jsoncallback=?",
			  {
			   text : txt,
			   format: "json",
			   method : 'flickr.photos.search',
			   api_key : 'b394ffe5c0d54e9431c0058f27bce49d',
			   per_page : '20',
			   page : current_page,
			  },
			  function(data) {
			    $.each(data.photos.photo, function(i,item){
			      $("<img/>").attr("src", 'http://farm'+item.farm+'.static.flickr.com/'+item.server+'/'+item.id+'_'+item.secret+'_s.jpg').appendTo("#pict");
			    });
			    current_page ++;
			  });
	}
	btn_yes.click(function(){
		page_translation(0,2);
	});
	btn_no.click(function(){
		page_translation(0,1);
	});
	load_btn.click(function(){
		load_pict(search_txt);
	});
	search_btn.click(function(){
		search_txt = search.val();
		page_translation(1,2);
	});
	to_top.click(function(){
		var txt = search.val();
		search_txt = 'けいおん';
		search.val('');
		pict.empty()
		page_translation(2,0);
	});
	var page_translation = function(current_screen, to_screen){
		if(current_screen==0 && to_screen==2) {
			init_screen.fadeOut('slow');
			init_screen.css('display','none');
			result_screen.fadeIn('slow');
			load_pict(search_txt);
		} else if(current_screen==0 && to_screen==1) {
			init_screen.fadeOut('slow');
			init_screen.css('display','none');
			other_screen.fadeIn('slow');
		} else if(current_screen==1 && to_screen==2) {
			other_screen.fadeOut('slow');
			other_screen.css('display','none');
			result_screen.fadeIn('slow');
			load_pict(search_txt);
		} else if(current_screen==2 && to_screen==0) {
			other_screen.css('display','none');
			result_screen.fadeOut('slow');
			result_screen.css('display','none');
			init_screen.fadeIn('slow');
		}
	}

});

