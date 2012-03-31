$(window).load(function(){
	var original_text = $('#original_text');
	var convert_text = $('#convert_text');

	var charArray =
    {
	  'a' : '\u0250',
      'b' : 'q',
      'c' : '\u0254',
      'd' : 'p',
      'e' : '\u01DD',
      'f' : '\u025F',
      'g' : '\u0183',
      'h' : '\u0265',
      'i' : '\u0131',
      'j' : '\u027E',
      'k' : '\u029E',
      'l' : '\u05DF',
      'm' : '\u026F',
      'n' : 'u',
      'r' : '\u0279',
      't' : '\u0287',
      'v' : '\u028C',
      'w' : '\u028D',
      'y' : '\u028E',
      '.' : '\u02D9',
      '[' : ']',
      '(' : ')',
      '{' : '}',
       '?' : '\u00BF',
       '!' : '\u00A1',
       "\'" : ',',
       '<' : '>',
        '_' : '\u203E',
        '\\' : '\\',
        ';' : '\u061B',
        '\u203F' : '\u2040',     //?
        '\u2045' : '\u2046',     //?
        '\u2234' : '\u2235' };

	var convert_str = function(ori_txt){
        var result = '';
        for (var i = ori_txt.length - 1; i >= 0; --i)
        {
            var tmp = charArray[ori_txt.charAt(i)];
            result += (tmp == undefined) ? ori_txt.charAt(i) : tmp;
        }
        return result;
	}

	original_text.keyup(function(){
		convert_text.val(convert_str($(this).val()));
	});
});

