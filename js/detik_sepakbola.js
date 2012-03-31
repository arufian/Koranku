const id_sepak = 'c8a2cfe486052b558ef5bd20eb48e3ec';
const id_news = '6057ddb018e8a53cf2f242cf0d8a2c46';
const id_komp_all = '376b997bcec05dbd53b0b61cf52ccd10';
const id_komp_nas = '21965ea3538f17d725d854ce4fb37f5f';
const id_komp_inter = '74822836d29f9477ebe6e3cfc9961a26';
const jp_yomiuri_new = '03bc2ed5efac4a80e928a9280a6791e4';
const search_pipes_all = '33192837b310d6f089a90d1c29bb81d5';
const search_pipes_indo = '675e0c1dca333d9ddedf42ea97dbe1ef';

const reg_indo = "id";
const reg_jap = "jp";
const reg_world = "en";

const det_sepak = 'det_sepak';
const det_news = 'det_news';
const det_inet = 'det_inet';
const kompas_all = 'kompas_all';
const kompas_nas = 'kompas_nas';
const kompas_inter = 'kompas_inter';
const yomiuri_new = 'yomiuri_new';

const top_page = 'top';
const news_content = 'news_content';

$(window).load(function(){
	back_btn = $('#back_btn');
	loading = $('#loading');
	d_sepak = $('#d_sepak');
	current_page = "top";
	current_article = null;
	current_region = "en";
	search_query = "";
	current_pick = -1;

	$.mobile.pageLoadErrorMessage = "Under Maintenance .. <br/> Still Developing";

	$('div[id="top"] div[id="region_group"] input[name="radioreg"]').live("click", function () {
		current_region = $(this).attr("value");
	});

	$('div[id="top"] div[id="search_form"] input[name="news_query"]').live("keypress", function(e) {
		if(e.keyCode == 13) {
			current_page = null;
			search_query = $(this).attr("value");
			current_region!= null && $.mobile.changePage("#news_list");
		}
	});

	$('div[id="top"] div[id="search_form"] a[data-url="news_query"]').live("click", function() {
		current_page = null;
		search_query = $('div[id="top"] div[id="search_form"] input[name="news_query"]').attr("value");
		current_region!= null && $.mobile.changePage("#news_list");
	});

	$('div[id="top"] ul[data-role="listview"] a').live("click", function () {
		current_page = $(this).attr("data-url");
		current_region = null;
		current_page!= null && $.mobile.changePage("#news_list");
	});

	$('div[id="news_list"]').live("pageshow", function () {
		var desc = $('div[id="news_list"] ul[data-role=listview]');
		var callback_a = function(){
			$.mobile.pageLoading(true);
		}
		$.mobile.pageLoading();
		if(current_page == det_sepak){
			common.loadPipes(id_sepak, desc, callback_a);
		} else if(current_page == det_news){
			common.loadPipes(id_news, desc, callback_a);
		} else if(current_page == kompas_all){
			common.loadPipes(id_komp_all, desc, callback_a);
		} else if(current_page == kompas_nas){
			common.loadPipes(id_komp_nas, desc, callback_a);
		} else if(current_page == kompas_inter){
			common.loadPipes(id_komp_inter, desc, callback_a);
		} else if(current_page == yomiuri_new){
			common.loadPipes(jp_yomiuri_new, desc, callback_a);
		} else if(current_region == reg_indo){
			common.loadPipes(search_pipes_indo, desc, callback_a, search_query);
		} else if(current_region == reg_jap || current_region == reg_world){
			common.loadPipes(search_pipes_all, desc, callback_a, search_query, current_region);
		}
	});
	$('div[id="news_list"]').live("pagebeforeshow", function (event, ui) {
		var desc = $('div[id="news_list"] ul[data-role=listview]');
		desc.html('');
	});
	$('div[id="news_list"] ul[data-role="listview"] a').live("click", function () {
		current_article = $(this).attr("data-url");
		current_pick = $(this).attr("data-identity");
		current_article!= null && $.mobile.changePage("#news_content");
	});

	$('div[id="news_content"]').live("pageshow", function () {
		var content = $('div[id="news_content"] div[data-role="content"]');
		if(current_region != null){
			// searching result
			common.viewArticle(content_desc[current_pick], content);
		}else{
			var callback = function(data){
				common.viewArticle(data, content);
				$.mobile.pageLoading(true);
			}
			$.mobile.pageLoading();
			common.ajaxLoadFile(current_article, callback);
		}
	});
	$('div[id="news_content"]').live("pagebeforeshow", function (event, ui) {
		var content = $('div[id="news_content"] div[data-role=content]');
		content.html('');
	});


});

var common = {
		loadPipes : function(idnya, desc, callback, query, lang){
			var str_url = "http://pipes.yahoo.com/pipes/pipe.run?";
			$.getJSON(str_url,
					  {
					   _id : idnya,
					   _render : 'json',
					   language : lang,
					   query : query,
					  },
					  function(data) {
						  iter = 0;
				          content_desc = [];
						  if(idnya == id_sepak || idnya == id_news){
							  var append_str = "<li data-role='list-divider'>Pilih Artikel</li>";
							  $.each(data.value.items, function(i,item){
								  append_str += "<li><a data-identity='news_"+idnya+"' data-url='"+item.guid.content+"'' href='javascript:void(0);' >";
								  if(item.enclosure != undefined)
									  append_str += "<img width='80px' src='"+item.enclosure.url+"' /> ";
								  append_str += "<p style='font-size:small'>"+item.pubDate+"</p>";
								  append_str += "<h2>"+item.title+"</h2>";
								  append_str += "</a></li>";
							  });
						  } else if(idnya == id_komp_all || idnya == id_komp_nas || idnya == id_komp_inter){
							  var append_str = "<li data-role='list-divider'>Pilih Artikel (<span style='color:red'>external link</span>)</li>";
							  $.each(data.value.items, function(i,item){
								  append_str += "<li><a data-identity='news_"+idnya+"' href='"+item.link+"'' target='_blank' >";
								  append_str += "<p style='font-size:small'>"+item.pubDate+"</p>";
								  append_str += "<h2>"+item.title+"</h2>";
								  append_str += "<p>"+item.description+"</p>";
								  append_str += "</a></li>";
							  });
						  } else if(idnya == jp_yomiuri_new){
							  var append_str = "<li data-role='list-divider'>読売新聞のトップランク記事(<span style='color:red'>外部リンク</span>)</li>";
							  $.each(data.value.items, function(i,item){
								  append_str += "<li><a data-identity='news_"+idnya+"' href='"+item.link+"'' target='_blank' >";
								  append_str += "<p style='font-size:small'>"+item.pubDate+"</p>";
								  append_str += "<h2>"+item.title+"</h2>";
								  append_str += "</a></li>";
							  });
						  } else if(idnya == search_pipes_all || idnya == search_pipes_indo){
							  var append_str = "<li data-role='list-divider'>Search Result</li>";
							  if(data.value.items.length == 0)
								  append_str += "<li><span style='color:red'>No Result</span></li>";
							  else {
								  $.each(data.value.items, function(i,item){
									  append_str += "<li><a data-identity='"+i+"' data-url='"+item.link+"'' href='javascript:void(0);' >";
									  append_str += "<p style='font-size:small'>"+item.pubDate+"</p>";
									  append_str += "<h2>"+item.title+"</h2>";
									  append_str += "</a></li>";
									  content_desc[i] = item.description;
								  });
							  }
						  }
						  desc.html(append_str);
						  desc.listview("refresh");
						  callback();
					  });
		},

		ajaxLoadFile : function(filename, callback){
			$.ajax({
				url: filename,
				cache: false,
				type: 'GET',
				success: function(data) {
					callback(data.responseText);
				}
			});
		},

		viewArticle : function(data, content){
			perline = data.split('\n');
			if(current_page == kompas_all || current_page == kompas_nas|| current_page == kompas_inter)
				var isi = common.scanningPageKompas(perline, current_page);
			else if(current_page == yomiuri_new)
				var isi = common.scanningPageYomiuri(data, current_page);
			else if(current_page == null){
				var isi = data;
				isi += '<br/><a href="'+current_article+'" target="_blank" data-role="button" data-inline="true" data-url="news_query" data-theme="a" class="ui-btn ui-btn-up-a ui-btn-inline ui-btn-icon-left ui-btn-corner-all ui-shadow">'+
				'<span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Click to read ..</span></span></a>';
			} else
				var isi = common.scanningPage(perline, current_page);
			if(isi == ""){
				isi = "<h2>No Article provided</h2><br/> Click the hot link <a href='"+current_article+"' rel='external' target='blank'>here</a>"
			}
			isi += '<div id="fb-root"></div><script src="http://connect.facebook.net/en_US/all.js#xfbml=1"></script><fb:comments href="'+current_article+'" num_posts="2" width="500" colorscheme="dark"></fb:comments>';
			content.html(isi);
		},

		scanningPage : function(html_array, berita_type){
			isdata_load = false;
			is_berita_content = false;
			is_get_content = false;
			awal_berita = '<span class="date">';
			isi_berita = '<div id="isiberita">';
			akhir_berita = '<strong>(';
			gak_perlu = '<div class="tower">';
			if(berita_type == det_sepak)
				gak_erlu_end = '<!--     <br/>-->';
			else if(berita_type == det_news)
				gak_erlu_end = '<!--<p>-->';
			is_gak_perlu = false;
			i=0;
			retval = '';
			do{
				if(is_berita_content){
					if(is_get_content){
						if((html_array[i].indexOf(akhir_berita)) > -1)
							isdata_load = true;
						else if((html_array[i].indexOf(gak_perlu)) > -1){
							is_gak_perlu = true;
						}
						if(!is_gak_perlu)
							retval += '\n'+html_array[i];
						else if((html_array[i].indexOf(gak_erlu_end)) > -1)
							is_gak_perlu = false;
					} else{
						if((html_array[i].indexOf(awal_berita)) > -1){
							retval += '\n'+html_array[i];
							is_get_content = true;
						}
					}
				} else {
					if((html_array[i].indexOf(isi_berita)) > -1)
						is_berita_content = true;
				}
				i++;
			} while(!isdata_load && i<html_array.length);
			return retval;
		},

		scanningPageKompas : function(code){
			var parser=new DOMParser();
            var xmlDoc=parser.parseFromString(code,"text/xml");
            var judul_div = xmlDoc.getElementsByClassName('isi_berita2011');
			return judul_div;
		},

		scanningPageYomiuri : function(code){
			var parser=new DOMParser();
            var xmlDoc = parser.parseFromString(code,"text/xml");
            code = xmlDoc.querySelector('.article-def');
            var content = xmlDoc.getElementsByClassName('article-def');
            var tmp = '<frameset rows="100%,*" frameborder="NO" border="0" framespacing="0">'+
                      '<frame name="conr_main_frame" src="'+current_article+'">'+
                   '	</frameset>';
			return code.innerHTML;
		},
}

var footer = {
	set_active : function(active_page){
		var active_str = 'ui-btn-active ui-state-persist';
		$('div[data-role="footer"] div[data-role="navbar"] ul a[data-url="'+active_page+'"]').attr("class",active_str);
	},
	set_nonactive : function(active_page){
		$('div[data-role="footer"] div[data-role="navbar"] ul a[data-url="'+active_page+'"]').attr("class",'');
	},
	detik_on : function(){
		$('#detik_footer').css('display', 'block');
		$('#kompas_footer').css('display', 'none');
	},
	kompas_on : function(){
		$('#detik_footer').css('display', 'none');
		$('#kompas_footer').css('display', 'block');
	}
}