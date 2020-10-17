		function Start_Fuzzy() {
			document.getElementById('SearchType1').checked = true;
			SetSelect();
			
			var startDate = new Date();
			var strTopResult ='';
			document.getElementById('SearchResult').innerHTML = strTopResult;


			//var Chars = 'abcdefghijklmnopqrstuvwxyzāīūṅñṭḍṇḷṃABCDEFGHIJKLMNOPQRSTUVWXYZĀĪŪṄÑṬḌHṆḶṂ';

			document.getElementById('msg').innerHTML = "";
			// document.getElementById('out').innerHTML = "";

			localStorage.setItem("Sr_type", 'F');

			var key = toUniRegEx(document.getElementById('key').value).trim().toLowerCase();
			if ( 1 < key.length) {
				localStorage.setItem("Sr_key", key);

				var i, x , y;
				var ResultSpan ='';

				var ary_key = [];
				var ary = key.split(' ');
				for (i in ary) {
					if (i.trim() != '') {
						//alert(i);
						ary_key[ary[i]] = ary_key[i];
					}
				}

				var max_length = 0;
				for (x=1; x<=3; x++) {
				  for (y=1; y<=8; y++) {
				    document.getElementById('Out' + y + x).innerHTML = '';
				    localStorage.setItem('Sr_Out' + y + x, '');
				  }
				}

				for (i in pws_no) {
					localStorage.setItem('Sr_id' + i, '');
				}

				var total_file = 0;
				var total_hit = 0;

				for (x=1; x<=3; x++) {
					for (y=1; y<=8; y++) {
						var name1 = 'Nikaya' + y + x;
						var cx_file = 0;
						var cx_hit = 0;

						var pali = '';
						if (document.getElementById(name1).checked) {
							name1 = name1.substring(6);

							for (i in pws_no) {
								//alert(i.substring(0, 2) + "  =  " + name1);

								if (i.substring(0, 2) == name1) {
									var file = 'pali/' + i + 'a.js';

									var Sr_id = '';
									//alert(file);

									//**********
									// read file
									//**********
									var flag = '0'
									var rawFile = new XMLHttpRequest();
									rawFile.open("GET", file, false);
									rawFile.onreadystatechange = function () {
										if (rawFile.readyState === 4) {
											if (rawFile.status === 200 || rawFile.status == 0) {
												var data = rawFile.responseText;

												var ary_source = data.split( "\n" );
												data = data.toLowerCase();

												var ary = data.split( "\n" );

												for(index = 0; index < ary.length; index++) {
													var flag_ary = '1';
													//var sno = ary[index].substring(6);
													//sno = parseInt(sno);
													for (j in ary_key) {
														if (ary[index].indexOf(j) == -1) {
															flag_ary = '0';
															j = 999;
														}
														//} else {
														//	//var ary_tmp = ary[index].split(j);
														//	//var regex = new RegExp( '(' + j + ')', 'i' );
														//	//var ary_tmp = ary_source[index].split(regex);
														//
														//	tmp = replacei(ary_source[index], j, sub=> '<a href="' + i + '.htm?n=' + sno + '"  target=_blank style="background:yellow">' + j + "</a>");
														//
														//	ary_source[index] = tmp;
													}
													if (flag_ary == '1') {
														if (flag == '0') {
															flag = '1';
															cx_file = cx_file + 1;
															ResultSpan = setResultSpan(i);
															pali = pali + '<hr style="border: 1pt dashed gray;">' + ResultSpan + i + " " + T_Book[i] + "</span><br>";
														}

														cx_hit = cx_hit + 1;

														var tmp = ary_source[index];

														tmp = tmp.replace(/\*/g, '') + "<br><br>";
														tmp = tmp.replace(/\';/, '');
														var pos = tmp.indexOf("='");
														var tmp_id = tmp.substring(6, pos-1);
														tmp = tmp.substring(pos + 2);

														for (j in ary_key) {
															tmp = replacei(tmp, j, sub=> '<a class="search-result" href="#/book/' + i + '/' + tmp_id + '" style="background:yellow">' + j + "</a>");
														}

														pali = pali + tmp;
														Sr_id = Sr_id + tmp_id + ";";
													}
												}
											}
										}
									}
									rawFile.send(null);
									//*****************
									// end read file
									//*****************
									if (Sr_id != '') {
										//alert(i +" =  " + Sr_id);
										localStorage.setItem('Sr_id' + i, ';' + Sr_id);
									}
								}

							}
						}
						if (cx_file != 0) {
							max_length = max_length + pali.length;
							if (5200000<max_length) {
								document.getElementById('Out' + y + x).innerHTML = '<label onClick="Show_Detail(\'Out' + y + x + '\')" style="color:blue;">' + cx_file + " Files, " + cx_hit + " Paragraphs.</label>" + '<b style="color:red">&nbsp;Out of Memory</b>';
							} else {
								document.getElementById('Out' + y + x).innerHTML = '<label onClick="Show_Detail(\'Out' + y + x + '\')" style="color:blue;">' + cx_file + " Files, " + cx_hit + " Paragraphs.</label>";
							}
							total_file = total_file + cx_file;
							total_hit = total_hit + cx_hit;
							localStorage.setItem('Sr_Out' + y + x, pali);
							strTopResult = strTopResult + pali;

							//alert(pali.length);
						} else {
							document.getElementById('Out' + y + x).innerHTML = '0 Hits.' ;
						}
					}
				}
			}
			var endDate = new Date();
			var seconds = (endDate.getTime() - startDate.getTime())/1000;
			document.getElementById('msg').innerHTML = 'Fuzzy Search : ' + total_file +' Files, ' + total_hit + ' Paragraphs, ' + seconds + " Seconds";

			// write the final string.
			document.getElementById('SearchResult').innerHTML = strTopResult;
		}

		function setResultSpan(i){
			var strSpan = '';
			var ipalitext = 0;
			ipalitext = Math.floor(i / 1000);
			switch (ipalitext){
				case 1:
					strSpan = '<span style="color:blue;font-weight:bold">';
					break;
				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
					strSpan = '<span style="color:red;font-weight:bold">';
					break;
				case 7:
					strSpan = '<span style="color:purple;font-weight:bold">';
					break;
				default:
					strSpan = '<span style="color:green;font-weight:bold">';
					break;
			}

			return strSpan;
					
		}
