var kana = {
	// 'a' : { 'ã‚': 'a', 'ã„': 'i', 'ã†': 'u', 'ãˆ': 'e', 'ãŠ': 'o'},
        'a': {'أَ': 'a', 'أِ': 'i', 'أُ': 'u'},
        'b': {'بَ': 'ba', 'بِ': 'bi', 'بُ': 'bu'},
        't': {'تَ': 'ta', 'تِ': 'ti', 'تُ': 'tu'},
        'th': {'ثَ': 'tha', 'ثِ': 'thi', 'ثُ': 'thu'},
        'j': {'جَ': 'ja', 'جِ': 'ji', 'جُ': 'ju'},
        'hh': {'حَ': 'ḥa', 'حِ': 'ḥi', 'حُ': 'ḥu'},
        'kh': {'خَ': 'kha', 'خِ': 'khi', 'خُ': 'khu'},
        'd': {'دَ': 'da', 'دِ': 'di', 'دُ': 'du'},
        'th': {'ذَ': 'tha', 'ذِ': 'thi', 'ذُ': 'thu'},
        'r': {'رَ': 'ra', 'رِ': 'ri', 'رُ': 'ru'},
        'z': {'زَ': 'za', 'زِ': 'zi', 'زُ': 'zu'},
        's': {'سَ': 'sa', 'سِ': 'si', 'سُ': 'su'},
        'ss': {'صَ': 'ṣa', 'صِ': 'ṣi', 'صُ': 'ṣu'},
        'sh': {'شَ': 'sha', 'شِ': 'shi', 'شُ': 'shu'},
        'dh': {'ضَ': 'ḍa', 'ضِ': 'ḍi', 'ضُ': 'ḍu'},
        'tt': {'طَ': 'ṭa', 'طِ': 'ṭi', 'طُ': 'ṭu'},
        'dhz': {'ظَ': 'ẓa', 'ظِ': 'ẓi', 'ظُ': 'ẓu'},
        'aa': {'عَ': 'ʿa', 'عِ': 'ʿi', 'عُ': 'ʿu'},
        'gh': {'غَ': 'gha', 'غِ': 'ghi', 'غُ': 'ghu'},
        'f': {'فَ': 'fa', 'فِ': 'fi', 'فُ': 'fu'},
        'qh': {'قَ': 'qa', 'قِ': 'qi', 'قُ': 'qu'},
        'k': {'كَ': 'ka', 'كِ': 'ki', 'كُ': 'ku'},
        'l': {'لَ': 'la', 'لِ': 'li', 'لُ': 'lu'},
        'm': {'مَ': 'ma', 'مِ': 'mi', 'مُ': 'mu'},
        'n': {'نَ': 'na', 'نِ': 'ni', 'نُ': 'nu'},
        'h': {'هَ': 'ha', 'هِ': 'hi', 'هُ': 'hu'},
        'w': {'وَ': 'wa', 'وِ': 'wi', 'وُ': 'wu'},
        'y': {'يَ': 'ya', 'يِ': 'yi', 'يُ': 'yu'},
	
}

var show_tools = [ 'أَ', 'أِ', 'أُ',
'بَ', 'بِ', 'بُ',
'تَ', 'تِ', 'تُ',
'ثَ', 'ثِ', 'ثُ',
'جَ', 'جِ', 'جُ',
'حَ', 'حِ', 'حُ',
'خَ', 'خِ', 'خُ',
'دَ', 'دِ', 'دُ',
'ذَ', 'ذِ', 'ذُ',
'رَ', 'رِ', 'رُ',
'زَ', 'زِ', 'زُ',
'سَ', 'سِ', 'سُ',
'شَ', 'شِ', 'شُ',
'صَ', 'صِ', 'صُ',
'ضَ', 'ضِ', 'ضُ',
'طَ', 'طِ', 'طُ',
'ظَ', 'ظِ', 'ظُ',
'عَ', 'عِ', 'عُ',
'غَ', 'غِ', 'غُ',
'فَ', 'فِ', 'فُ',
'قَ', 'قِ', 'قُ',
'كَ', 'كِ', 'كُ',
'لَ', 'لِ', 'لُ',
'مَ', 'مِ', 'مُ',
'نَ', 'نِ', 'نُ',
'هَ', 'هِ', 'هُ',
'وَ', 'وِ', 'وُ',
'يَ', 'يِ', 'يُ'];

var replacements = {
	'o': ['wo'],
	'chi': ['ci'],
	'shi': ['si'],
	'tsu': ['tu'],
	'zu': ['du'],
	'ji': ['di', 'zi'],
	'fu': ['hu'],
	'ja': ['dya'],
	'jo': ['dyo'],
	'ju': ['dyu']
};

var active = [];
var shuffled = [];
var fonts = [];

var cur_kana;
var cur_reading;

var total_answered = 0;
var total_correct = 0;

function save_settings() {
	inputs = document.getElementsByTagName('input');
	for (i = 0; i < inputs.length; i++) {
		if (inputs[i].type == 'checkbox') {
			checked = inputs[i].checked ? '1' : '0';
			localStorage.setItem('kana_' + inputs[i].id, checked);
		}
	}
	
	collect();
}

function load_settings() {
	inputs = document.getElementsByTagName('input');
	for (i = 0; i < inputs.length; i++) {
		if (inputs[i].type == 'checkbox') {
			var setting = localStorage.getItem('kana_' + inputs[i].id);
			if(setting === '1') {
				inputs[i].checked = true;
			} else if(setting === '0') {
				inputs[i].checked = false;
			}
		}
	}
	
	collect();
}

function check(set) {
	var trs = document.getElementsByClassName(set);
	for (i = 0; i < trs.length; i++) {
		var tds = trs[i].children;
		for (x = 0; x < tds.length; x++) {
			if(tds[x].children[0].id != 'KOI-WIN') {
				tds[x].children[0].checked = true;
			}
		}
	}
	save_settings();
}

function uncheck(set) {
	var trs = document.getElementsByClassName(set);
	for (i = 0; i < trs.length; i++) {
		var tds = trs[i].children;
		for (x = 0; x < tds.length; x++) {
			tds[x].children[0].checked = false;
		}
	}
	save_settings();
}

function shuffle(orig_array) {
	var array = orig_array.slice(0);
	var currentIndex = array.length, temporaryValue, randomIndex;

	while (0 !== currentIndex) {

		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

function collect() {
	kanacheck = document.getElementsByClassName('kanacheck');
    console.log("🚀 ~ file: script.js:157 ~ collect ~ kanacheck:", kanacheck)
    
	active = [];
	shuffled = [];
	for (i = 0; i < kanacheck.length; i++) {
        cur = kanacheck[i];
		if(cur.checked == true) {
            
			for (p in kana[cur.id]) {
				active.push( [p, kana[cur.id][p]] );
			}
		}
	}
	
	fonts = [];
	fontcheck = document.getElementsByClassName('fontcheck');
	for (i = 0; i < fontcheck.length; i++) {
		if(fontcheck[i].checked == true) {
			fonts.push(fontcheck[i].id);
		}
	}
}

function show_kana() {	
    console.log(active)
	wrong = false;
	document.getElementById('input_box').value = '';
	
	if(active.length == 0) {
		document.getElementById('a').checked = true;
		save_settings();
	}
	

	
	if(total_answered > 0) {
		document.getElementById('count').innerHTML = total_correct + '/' + total_answered;
		document.getElementById('message').innerHTML = '&nbsp;';
	}
	
	if(shuffled.length == 0) {
		shuffled = shuffle(active);
	}
	
	if(cur_kana && shuffled[0][0] == cur_kana) {
		shuffled.shift();
	}
	
    console.log(shuffled)
	cur_kana = shuffled[0][0];
	cur_reading = shuffled[0][1];
	
	shuffled.shift();
	
	var font = fonts[Math.floor(Math.random()*fonts.length)];
	
	if(font == 'default') {
		document.getElementById('kana').innerHTML = cur_kana;
	} else {
		document.getElementById('kana').innerHTML = '<img src="fonts/' + font + '/' + cur_kana + '.png" />';
	}
	document.getElementById('answer').innerHTML = cur_reading;
	
	if(show_tools.indexOf(cur_kana) == -1) {
		document.getElementById('tool_stroke').style.visibility = 'hidden';
	} else {
		document.getElementById('tool_stroke').style.visibility = 'visible';
	}
}

function check_answer() {
	answer = document.getElementById('input_box').value.toLowerCase();
	if(! answer) {
		answer = 'x';
	}
	
	chars = answer.split('');
	
	possible = [cur_reading];
	if(cur_reading in replacements) {
		possible = possible.concat(replacements[cur_reading]);
	}

	for (i = 0; i < chars.length; i++) {
		var err = true;
		
		for (x = 0; x < possible.length; x++) {
			if(chars[i] == possible[x].charAt(i)) {
				err = false;
			}
			if(answer == possible[x]) {
				answer = cur_reading;
			}
		}
		
		if(err) {
			break;
		}
	}
	
	if(err) {
		wrong = true;
		document.getElementById('message').innerHTML = '<span id="wrong">' + cur_kana + ' = ' + cur_reading + '</span>';
	}
	
	if(answer == cur_reading) {
		total_answered += 1;
		if( ! wrong) {
			total_correct += 1;
		}
		show_kana();
	}
}

function force_next() {
	if(shuffled.length > 3) {
		shuffled.splice(3, 0, [cur_kana, cur_reading]);
	}
	if(shuffled.length > 13) {
		shuffled.splice(13, 0, [cur_kana, cur_reading]);
	}
	total_answered += 1;
	
	show_kana();
}

function show_answer() {
	document.getElementById('answer').style.visibility = 'visible'; 
}

function hide_answer() {
	document.getElementById('answer').style.visibility = 'hidden';
}

function play_sound() {
	var audio = new Audio('audio/' + cur_reading + '.mp3');
	audio.play();
	document.getElementById('input_box').focus();
}

function play_other(file) {
	var audio = new Audio('audio/' + file + '.mp3');
	audio.play();
}

function stroke_order() {
	document.getElementById('kana').innerHTML = '<img src="stroke/' + cur_kana + '.gif" id="stroke" />';
	document.getElementById('input_box').focus();
}


onload = function () {
	load_settings();
	
	inputs = document.getElementsByTagName('input');
	for (i = 0; i < inputs.length; i++) {
		if (inputs[i].type == 'checkbox') {
			inputs[i].onclick = save_settings;
			inputs[i].onpropertychange = inputs[i].oninput;
		}
	}
	
	show_kana();
	
	document.getElementById('tool_sound').onclick = play_sound;
	document.getElementById('tool_stroke').onclick = stroke_order;
	
	var kana_div = document.getElementById('kana');
	kana_div.onmouseover = show_answer;
	kana_div.onmouseout = hide_answer;
	
	var answer_input = document.getElementById('input_box');
	answer_input.focus();
	answer_input.oninput = check_answer;
	answer_input.onpropertychange = answer_input.oninput;
	
	document.body.onkeydown = function(e){
		document.getElementById('input_box').focus();
		if(e.keyCode == 32 || e.keyCode == 13){
			e.preventDefault();
			if( ! wrong) {
				check_answer();
			} else {
				force_next();
			}
		}
	}
}