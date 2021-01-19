function changeContent(e, t) {
	e.addClass("inactive"), setTimeout(function() {
		e.removeClass("active inactive"), t.addClass("active")
	}, 300)
}
function chargeContent(e, t) {
	function n() {
		t.fetch({
			success: function() {
				e.children(".js-spinner").addClass("fadeOut"), setTimeout(function() {
					e.children(".js-spinner").removeClass("fadeUp fadeOut"), e.children(".js-group_interactive").addClass("active")
				}, 300)
			},
			
			error: function() {
				e.children(".js-spinner").addClass("fadeOut"), setTimeout(function() {
					e.children(".js-spinner").removeClass("fadeUp fadeOut"), e.children(".js-group_interactive").addClass("active")
				}, 300)
			}
		})
	}
	e.children(".js-group_interactive").hasClass("active") || e.children(".js-spinner").addClass("fadeUp"), e.children(".js-group_interactive").addClass("inactive"), setTimeout(function() {
		e.children(".js-spinner").addClass("fadeUp"), e.children(".js-group_interactive").removeClass("active inactive"), e.children(".js-group_interactive").find(".js-item").remove(), e.children(".js-group_interactive").find(".js-empty_group").slideDown("fast"), $(".js-group_optional").removeClass("js-group_interactive"), n()
	}, 300)
}
function toggleDetail(e, t, n) {
	t.hasClass("active") ? (e.html("Menos Detalles"), t.addClass("inactive"), setTimeout(function() {
		n.addClass("active"), t.removeClass("active inactive")
	}, 300)) : (e.html("Mas Detalles"), n.addClass("inactive"), setTimeout(function() {
		t.addClass("active"), n.removeClass("active inactive")
	}, 300))
}
function toggleContent(e, t) {
	e.addClass("inactive"), setTimeout(function() {
		t.addClass("active"), e.removeClass("active inactive")
	}, 300)
}
function singleToggleContent(e) {
	e.hasClass("active") ? (e.addClass("inactive"), setTimeout(function() {
		e.removeClass("active inactive")
	}, 300)) : e.addClass("active")
}
function singleFadeContent(e) {
	e.hasClass("fadeIn") ? (e.addClass("fadeOut"), setTimeout(function() {
		e.removeClass("fadeIn fadeOut")
	}, 300)) : e.addClass("fadeIn")
}
function showMessageFeedback(e, t) {
	e.addClass(t);
	setTimeout(function() {
		e.addClass("inactive"), setTimeout(function() {
			e.removeClass(t + " inactive")
		}, 300)
	}, 3e3)
}
function toggleDelete(e) {
	e.hasClass("active") ? (e.addClass("inactive"), setTimeout(function() {
		e.removeClass("active inactive")
	}, 300)) : e.addClass("active")
}
function cleanForm(e) {
	e.find("input[type=text]").val("")
}
function saveNew(e, t, n, i) {
	var r = e.find(".js_form_messages"),
		s = e.find("input[type=submit]");
	s.val("Guardando...").attr("disabled", !0), t.save(null, {
		success: function(t, o) {
			if (o.success) {
				if (t.set({
					idget: o.idget,
					success: !1
				}), o.new_active) {
					var a = n.where({
						state: "A"
					}),
						c = a[0];
					c && (c.set({
						state: "T",
						state_before: "A"
					}), c.save())
				}
				o.render && n.add(t, {
					id: o.idget
				}), r.html(i.template_msg_success()), s.val("Guardado "), setTimeout(function() {
					changeContent(i.$content_new, i.$content_main), cleanForm(e), s.removeAttr("disabled").val("Guardar"), r.html("")
				}, 2e3)
			} else r.html(i.template_msg_error(o)), s.removeAttr("disabled").val("Guardar")
		},
		
		error: function() {
			s.removeAttr("disabled").val("Guardar"), r.html(i.template_msg_danger())
		}
	})
}
function update(e, t) {
	var n = e.find(".js_form_messages"),
		i = e.find("input[type=submit]");
	i.val("Guardando...").attr("disabled", !0), t.model.save(null, {
		success: function(e, r) {
			r.success ? (i.val("Guardado "), n.html(t.template_msg_success()), setTimeout(function() {
				$("html body").animate({
					scrollTop: t.$el.offset().top - 70
				}, 400)
			}, 1700)) : (i.val("Guardar").removeAttr("disabled"), n.html(t.template_msg_error(r)))
		},
		
		error: function() {
			i.val("Guardar").removeAttr("disabled"), n.html(t.template_msg_danger())
		}
	})
}
function deleteItem(e, t) {
	e.attr("disabled", !0).html("Eliminando..."), t.model.destroy({
		success: function(n, i) {
			i.success ? (e.html("Eliminado "), setTimeout(function() {
				t.$el.addClass("delete"), setTimeout(function() {
					t.$el.remove()
				}, 300)
			}, 1300)) : e.removeAttr("disabled").html("Si, estoy seguro")
		},
		
		error: function() {
			e.removeAttr("disabled").html("Si, estoy seguro")
		}
	})
}
function displayMainMenu() {
	$("#js_main-btn-menu").on("click", function() {
		$("#js_main-menu-ul").hasClass("active") ? ($("#js_main-menu-ul").addClass("inactive"), setTimeout(function() {
			$("#js_main-menu-ul").removeClass("active inactive")
		}, 300)) : $("#js_main-menu-ul").addClass("active")
	})
}
function global() {
	function e(e, t) {
		var n;
		$(e).find("a").on("click", function() {
			n = $(this).attr("going-to"), $(e).find("a.active").removeClass("active"), $(this).addClass("active"), $(t).find(".tab_data.active").removeClass("active"), $("#tab_" + n).addClass("active")
		})
	}
	function t(e) {
		$(window).scroll(function() {
			$(this).scrollTop() >= 110 ? e.addClass("fixed") : e.removeClass("fixed")
		})
	}
	function n() {
		$(window).scroll(function() {
			$(this).scrollTop() >= 120 ? ($(".navigationButtonsSVCLayoutRight").addClass("navigationButtonsSVCFixed"), $(".navigationButtonsSVCLayoutLeft").addClass("navigationButtonsSVCFixed")) : ($(".navigationButtonsSVCLayoutRight").removeClass("navigationButtonsSVCFixed"), $(".navigationButtonsSVCLayoutLeft").removeClass("navigationButtonsSVCFixed"))
		})
	}
	return {
		toggleTabs: e,
		auxiliarVoh: t,
		scrollOldAux: n
	}
}
function smartInput(e) {
	function t(e) {
		n.val(e.name), i.removeClass("active");
		var t = i.data().tags;
		t = t.split("|"), t.forEach(function(t) {
			i.siblings("input[name=" + t + "]").val(e[t])
		})
	}
	var n = e.find(".js-input_select_category"),
		i = e.find(".js-ul_list_data");
	e.find(".js-val_product_category");
	n.on("keyup", function(e) {
		if (38 !== e.keyCode && 40 !== e.keyCode && 13 !== e.keyCode) {
			i.addClass("active");
			var r = n.val().toUpperCase();
			
			i.children("li").each(function() {
				currentLiText = $(this).text().toUpperCase(), showCurrentLi = currentLiText.indexOf(r) !== -1, $(this).toggle(showCurrentLi)
			}), i.children("li[data-id=N_C]").css("display", "list-item");
			var s = !0,
				o = 0;
			i.children("li").removeClass("select"), i.children("li").attr("number", null), i.children("li").each(function() {
				"none" !== $(this).css("display") && s ? ($(this).attr("number", o).addClass("select"), s = !1, o++) : "none" !== $(this).css("display") && ($(this).attr("number", o), o++)
			})
		} else if (13 === e.keyCode) {
			var a = i.children(".select").data();
			
			a.name = i.children(".select").children("a").text(), t(a)
		} else {
			var c = 0;
			if (i.children("li").each(function() {
				"none" !== $(this).css("display") && c++
			}), c > 0) {
				var l;
				if (38 === e.keyCode) {
					var u = n.val();
					
					n.val(""), n.val(u), l = parseInt(i.children(".select").attr("number")) - 1
				} else 40 === e.keyCode && (l = parseInt(i.children(".select").attr("number")) + 1);
				l >= 0 && l < c && (i.children(".select").removeClass("select"), i.children("li[number=" + l + "]").addClass("select"))
			}
		}
	}), i.find("a").on("click", function(e) {
		e.preventDefault();
		
		var n = $(e.currentTarget).parent().data();
		
		n.name = i.children(".select").children("a").text(), t(n), i.children("li").each(function() {
			currentLiText = $(this).text().toUpperCase(), showCurrentLi = currentLiText.indexOf(n.name.toUpperCase()) !== -1, $(this).toggle(showCurrentLi)
		}), i.children("li[data-id=N_C]").css("display", "list-item");
		var r = !0,
			s = 0;
		i.children("li").removeClass("select"), i.children("li").attr("number", null), i.children("li").each(function() {
			"none" !== $(this).css("display") && r ? ($(this).attr("number", s).addClass("select"), r = !1, s++) : "none" !== $(this).css("display") && ($(this).attr("number", s), s++)
		})
	}), n.on("focusout", function() {
		setTimeout(function() {
			i.removeClass("active")
		}, 200)
	})
}!
function(e, t) {
	function n(e) {
		var t = e.length,
			n = ue.type(e);
		return !ue.isWindow(e) && (!(1 !== e.nodeType || !t) || ("array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e)))
	}
	function i(e) {
		var t = Ce[e] = {};
		
		return ue.each(e.match(pe) || [], function(e, n) {
			t[n] = !0
		}), t
	}
	function r(e, n, i, r) {
		if (ue.acceptData(e)) {
			var s, o, a = ue.expando,
				c = e.nodeType,
				l = c ? ue.cache : e,
				u = c ? e[a] : e[a] && a;
			if (u && l[u] && (r || l[u].data) || i !== t || "string" != typeof n) return u || (u = c ? e[a] = te.pop() || ue.guid++ : a), l[u] || (l[u] = c ? {} : {
				toJSON: ue.noop
			}), ("object" == typeof n || "function" == typeof n) && (r ? l[u] = ue.extend(l[u], n) : l[u].data = ue.extend(l[u].data, n)), o = l[u], r || (o.data || (o.data = {}), o = o.data), i !== t && (o[ue.camelCase(n)] = i), "string" == typeof n ? (s = o[n], null == s && (s = o[ue.camelCase(n)])) : s = o, s
		}
	}
	function s(e, t, n) {
		if (ue.acceptData(e)) {
			var i, r, s = e.nodeType,
				o = s ? ue.cache : e,
				c = s ? e[ue.expando] : ue.expando;
			if (o[c]) {
				if (t && (i = n ? o[c] : o[c].data)) {
					ue.isArray(t) ? t = t.concat(ue.map(t, ue.camelCase)) : t in i ? t = [t] : (t = ue.camelCase(t), t = t in i ? [t] : t.split(" ")), r = t.length;
					for (; r--;) delete i[t[r]];
					if (n ? !a(i) : !ue.isEmptyObject(i)) return
				}(n || (delete o[c].data, a(o[c]))) && (s ? ue.cleanData([e], !0) : ue.support.deleteExpando || o != o.window ? delete o[c] : o[c] = null)
			}
		}
	}
	function o(e, n, i) {
		if (i === t && 1 === e.nodeType) {
			var r = "data-" + n.replace(Ne, "-$1").toLowerCase();
			
			if (i = e.getAttribute(r), "string" == typeof i) {
				try {
					i = "true" === i || "false" !== i && ("null" === i ? null : +i + "" === i ? +i : ke.test(i) ? ue.parseJSON(i) : i)
				} catch (s) {}
				ue.data(e, n, i)
			} else i = t
		}
		return i
	}
	function a(e) {
		var t;
		for (t in e) if (("data" !== t || !ue.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
		return !0
	}
	function c() {
		return !0
	}
	function l() {
		return !1
	}
	function u() {
		try {
			return X.activeElement
		} catch (e) {}
	}
	function d(e, t) {
		do e = e[t];
		while (e && 1 !== e.nodeType);
		return e
	}
	function p(e, t, n) {
		if (ue.isFunction(t)) return ue.grep(e, function(e, i) {
			return !!t.call(e, i, e) !== n
		});
		
		if (t.nodeType) return ue.grep(e, function(e) {
			return e === t !== n
		});
		
		if ("string" == typeof t) {
			if (Be.test(t)) return ue.filter(t, e, n);
			t = ue.filter(t, e)
		}
		return ue.grep(e, function(e) {
			return ue.inArray(e, t) >= 0 !== n
		})
	}
	function f(e) {
		var t = qe.split("|"),
			n = e.createDocumentFragment();
		
		if (n.createElement) for (; t.length;) n.createElement(t.pop());
		return n
	}
	function h(e, t) {
		return ue.nodeName(e, "table") && ue.nodeName(1 === t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
	}
	function m(e) {
		return e.type = (null !== ue.find.attr(e, "type")) + "/" + e.type, e
	}
	function g(e) {
		var t = rt.exec(e.type);
		return t ? e.type = t[1] : e.removeAttribute("type"), e
	}
	function _(e, t) {
		for (var n, i = 0; null != (n = e[i]); i++) ue._data(n, "globalEval", !t || ue._data(t[i], "globalEval"))
	}
	function v(e, t) {
		if (1 === t.nodeType && ue.hasData(e)) {
			var n, i, r, s = ue._data(e),
				o = ue._data(t, s),
				a = s.events;
			if (a) {
				delete o.handle, o.events = {};
				
				for (n in a) for (i = 0, r = a[n].length; r > i; i++) ue.event.add(t, n, a[n][i])
			}
			o.data && (o.data = ue.extend({}, o.data))
		}
	}
	function y(e, t) {
		var n, i, r;
		if (1 === t.nodeType) {
			if (n = t.nodeName.toLowerCase(), !ue.support.noCloneEvent && t[ue.expando]) {
				r = ue._data(t);
				for (i in r.events) ue.removeEvent(t, i, r.handle);
				t.removeAttribute(ue.expando)
			}
			"script" === n && t.text !== e.text ? (m(t).text = e.text, g(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), ue.support.html5Clone && e.innerHTML && !ue.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && tt.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
		}
	}
	function b(e, n) {
		var i, r, s = 0,
			o = typeof e.getElementsByTagName !== G ? e.getElementsByTagName(n || "*") : typeof e.querySelectorAll !== G ? e.querySelectorAll(n || "*") : t;
		if (!o) for (o = [], i = e.childNodes || e; null != (r = i[s]); s++)!n || ue.nodeName(r, n) ? o.push(r) : ue.merge(o, b(r, n));
		return n === t || n && ue.nodeName(e, n) ? ue.merge([e], o) : o
	}
	function $(e) {
		tt.test(e.type) && (e.defaultChecked = e.checked)
	}
	function w(e, t) {
		if (t in e) return t;
		for (var n = t.charAt(0).toUpperCase() + t.slice(1), i = t, r = xt.length; r--;) if (t = xt[r] + n, t in e) return t;
		return i
	}
	function j(e, t) {
		return e = t || e, "none" === ue.css(e, "display") || !ue.contains(e.ownerDocument, e)
	}
	function x(e, t) {
		for (var n, i, r, s = [], o = 0, a = e.length; a > o; o++) i = e[o], i.style && (s[o] = ue._data(i, "olddisplay"), n = i.style.display, t ? (s[o] || "none" !== n || (i.style.display = ""), "" === i.style.display && j(i) && (s[o] = ue._data(i, "olddisplay", T(i.nodeName)))) : s[o] || (r = j(i), (n && "none" !== n || !r) && ue._data(i, "olddisplay", r ? n : ue.css(i, "display"))));
		for (o = 0; a > o; o++) i = e[o], i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? s[o] || "" : "none"));
		return e
	}
	function C(e, t, n) {
		var i = _t.exec(t);
		return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t
	}
	function k(e, t, n, i, r) {
		for (var s = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, o = 0; 4 > s; s += 2)"margin" === n && (o += ue.css(e, n + jt[s], !0, r)), i ? ("content" === n && (o -= ue.css(e, "padding" + jt[s], !0, r)), "margin" !== n && (o -= ue.css(e, "border" + jt[s] + "Width", !0, r))) : (o += ue.css(e, "padding" + jt[s], !0, r), "padding" !== n && (o += ue.css(e, "border" + jt[s] + "Width", !0, r)));
		return o
	}
	function N(e, t, n) {
		var i = !0,
			r = "width" === t ? e.offsetWidth : e.offsetHeight,
			s = ut(e),
			o = ue.support.boxSizing && "border-box" === ue.css(e, "boxSizing", !1, s);
		if (0 >= r || null == r) {
			if (r = dt(e, t, s), (0 > r || null == r) && (r = e.style[t]), vt.test(r)) return r;
			i = o && (ue.support.boxSizingReliable || r === e.style[t]), r = parseFloat(r) || 0
		}
		return r + k(e, t, n || (o ? "border" : "content"), i, s) + "px"
	}
	function T(e) {
		var t = X,
			n = bt[e];
		return n || (n = O(e, t), "none" !== n && n || (lt = (lt || ue("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), t = (lt[0].contentWindow || lt[0].contentDocument).document, t.write("<!doctype html><html><body>"), t.close(), n = O(e, t), lt.detach()), bt[e] = n), n
	}
	function O(e, t) {
		var n = ue(t.createElement(e)).appendTo(t.body),
			i = ue.css(n[0], "display");
		return n.remove(), i
	}
	function S(e, t, n, i) {
		var r;
		if (ue.isArray(t)) ue.each(t, function(t, r) {
			n || kt.test(e) ? i(e, r) : S(e + "[" + ("object" == typeof r ? t : "") + "]", r, n, i)
		});
		else if (n || "object" !== ue.type(t)) i(e, t);
		else
		for (r in t) S(e + "[" + r + "]", t[r], n, i)
	}
	function E(e) {
		return function(t, n) {
			"string" != typeof t && (n = t, t = "*");
			var i, r = 0,
				s = t.toLowerCase().match(pe) || [];
			if (ue.isFunction(n)) for (; i = s[r++];)"+" === i[0] ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
		}
	}
	function A(e, n, i, r) {
		function s(c) {
			var l;
			return o[c] = !0, ue.each(e[c] || [], function(e, c) {
				var u = c(n, i, r);
				return "string" != typeof u || a || o[u] ? a ? !(l = u) : t : (n.dataTypes.unshift(u), s(u), !1)
			}), l
		}
		var o = {},
			a = e === Jt;
		return s(n.dataTypes[0]) || !o["*"] && s("*")
	}
	function D(e, n) {
		var i, r, s = ue.ajaxSettings.flatOptions || {};
		
		for (r in n) n[r] !== t && ((s[r] ? e : i || (i = {}))[r] = n[r]);
		return i && ue.extend(!0, e, i), e
	}
	function U(e, n, i) {
		for (var r, s, o, a, c = e.contents, l = e.dataTypes;
		"*" === l[0];) l.shift(), s === t && (s = e.mimeType || n.getResponseHeader("Content-Type"));
		if (s) for (a in c) if (c[a] && c[a].test(s)) {
			l.unshift(a);
			break
		}
		if (l[0] in i) o = l[0];
		else {
			for (a in i) {
				if (!l[0] || e.converters[a + " " + l[0]]) {
					o = a;
					break
				}
				r || (r = a)
			}
			o = o || r
		}
		return o ? (o !== l[0] && l.unshift(o), i[o]) : t
	}
	function R(e, t, n, i) {
		var r, s, o, a, c, l = {},
			u = e.dataTypes.slice();
		
		if (u[1]) for (o in e.converters) l[o.toLowerCase()] = e.converters[o];
		for (s = u.shift(); s;) if (e.responseFields[s] && (n[e.responseFields[s]] = t), !c && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), c = s, s = u.shift()) if ("*" === s) s = c;
		else if ("*" !== c && c !== s) {
			if (o = l[c + " " + s] || l["* " + s], !o) for (r in l) if (a = r.split(" "), a[1] === s && (o = l[c + " " + a[0]] || l["* " + a[0]])) {
				o === !0 ? o = l[r] : l[r] !== !0 && (s = a[0], u.unshift(a[1]));
				break
			}
			if (o !== !0) if (o && e["throws"]) t = o(t);
			else
			try {
				t = o(t)
			} catch (d) {
				return {
					state: "parsererror",
					error: o ? d : "No conversion from " + c + " to " + s
				}
			}
		}
		return {
			state: "success",
			data: t
		}
	}
	function F() {
		try {
			return new e.XMLHttpRequest
		} catch (t) {}
	}
	function P() {
		try {
			return new e.ActiveXObject("Microsoft.XMLHTTP")
		} catch (t) {}
	}
	function M() {
		return setTimeout(function() {
			Zt = t
		}), Zt = ue.now()
	}
	function I(e, t, n) {
		for (var i, r = (sn[t] || []).concat(sn["*"]), s = 0, o = r.length; o > s; s++) if (i = r[s].call(n, t, e)) return i
	}
	function z(e, t, n) {
		var i, r, s = 0,
			o = rn.length,
			a = ue.Deferred().always(function() {
				delete c.elem
			}),
			c = function() {
				if (r) return !1;
				for (var t = Zt || M(), n = Math.max(0, l.startTime + l.duration - t), i = n / l.duration || 0, s = 1 - i, o = 0, c = l.tweens.length; c > o; o++) l.tweens[o].run(s);
				return a.notifyWith(e, [l, s, n]), 1 > s && c ? n : (a.resolveWith(e, [l]), !1)
			},
			l = a.promise({
				elem: e,
				props: ue.extend({}, t),
				opts: ue.extend(!0, {
					specialEasing: {}
				}, n),
				originalProperties: t,
				originalOptions: n,
				startTime: Zt || M(),
				duration: n.duration,
				tweens: [],
				createTween: function(t, n) {
					var i = ue.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
					return l.tweens.push(i), i
				},
				
				stop: function(t) {
					var n = 0,
						i = t ? l.tweens.length : 0;
					if (r) return this;
					for (r = !0; i > n; n++) l.tweens[n].run(1);
					return t ? a.resolveWith(e, [l, t]) : a.rejectWith(e, [l, t]), this
				}
			}),
			u = l.props;
		for (L(u, l.opts.specialEasing); o > s; s++) if (i = rn[s].call(l, e, u, l.opts)) return i;
		return ue.map(u, I, l), ue.isFunction(l.opts.start) && l.opts.start.call(e, l), ue.fx.timer(ue.extend(c, {
			elem: e,
			anim: l,
			queue: l.opts.queue
		})), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
	}
	function L(e, t) {
		var n, i, r, s, o;
		for (n in e) if (i = ue.camelCase(n), r = t[i], s = e[n], ue.isArray(s) && (r = s[1], s = e[n] = s[0]), n !== i && (e[i] = s, delete e[n]), o = ue.cssHooks[i], o && "expand" in o) {
			s = o.expand(s), delete e[i];
			for (n in s) n in e || (e[n] = s[n], t[n] = r)
		} else t[i] = r
	}
	function B(e, t, n) {
		var i, r, s, o, a, c, l = this,
			u = {},
			d = e.style,
			p = e.nodeType && j(e),
			f = ue._data(e, "fxshow");
		n.queue || (a = ue._queueHooks(e, "fx"), null == a.unqueued && (a.unqueued = 0, c = a.empty.fire, a.empty.fire = function() {
			a.unqueued || c()
		}), a.unqueued++, l.always(function() {
			l.always(function() {
				a.unqueued--, ue.queue(e, "fx").length || a.empty.fire()
			})
		})), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [d.overflow, d.overflowX, d.overflowY], "inline" === ue.css(e, "display") && "none" === ue.css(e, "float") && (ue.support.inlineBlockNeedsLayout && "inline" !== T(e.nodeName) ? d.zoom = 1 : d.display = "inline-block")), n.overflow && (d.overflow = "hidden", ue.support.shrinkWrapBlocks || l.always(function() {
			d.overflow = n.overflow[0], d.overflowX = n.overflow[1], d.overflowY = n.overflow[2]
		}));
		for (i in t) if (r = t[i], en.exec(r)) {
			if (delete t[i], s = s || "toggle" === r, r === (p ? "hide" : "show")) continue;
			u[i] = f && f[i] || ue.style(e, i)
		}
		if (!ue.isEmptyObject(u)) {
			f ? "hidden" in f && (p = f.hidden) : f = ue._data(e, "fxshow", {}), s && (f.hidden = !p), p ? ue(e).show() : l.done(function() {
				ue(e).hide()
			}), l.done(function() {
				var t;
				ue._removeData(e, "fxshow");
				for (t in u) ue.style(e, t, u[t])
			});
			
			for (i in u) o = I(p ? f[i] : 0, i, l), i in f || (f[i] = o.start, p && (o.end = o.start, o.start = "width" === i || "height" === i ? 1 : 0))
		}
	}
	function J(e, t, n, i, r) {
		return new J.prototype.init(e, t, n, i, r)
	}
	function V(e, t) {
		var n, i = {
			height: e
		},
			r = 0;
		for (t = t ? 1 : 0; 4 > r; r += 2 - t) n = jt[r], i["margin" + n] = i["padding" + n] = e;
		return t && (i.opacity = i.width = e), i
	}
	function H(e) {
		return ue.isWindow(e) ? e : 9 === e.nodeType && (e.defaultView || e.parentWindow)
	}
	var q, W, G = typeof t,
		Y = e.location,
		X = e.document,
		K = X.documentElement,
		Z = e.jQuery,
		Q = e.$,
		ee = {},
		te = [],
		ne = "1.10.2",
		ie = te.concat,
		re = te.push,
		se = te.slice,
		oe = te.indexOf,
		ae = ee.toString,
		ce = ee.hasOwnProperty,
		le = ne.trim,
		ue = function(e, t) {
			return new ue.fn.init(e, t, W)
		},
		de = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
		pe = /\S+/g,
		fe = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
		he = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
		me = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
		ge = /^[\],:{}\s]*$/,
		_e = /(?:^|:|,)(?:\s*\[)+/g,
		ve = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
		ye = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
		be = /^-ms-/,
		$e = /-([\da-z])/gi,
		we = function(e, t) {
			return t.toUpperCase()
		},
		je = function(e) {
			(X.addEventListener || "load" === e.type || "complete" === X.readyState) && (xe(), ue.ready())
		},
		xe = function() {
			X.addEventListener ? (X.removeEventListener("DOMContentLoaded", je, !1), e.removeEventListener("load", je, !1)) : (X.detachEvent("onreadystatechange", je), e.detachEvent("onload", je))
		};
	
	ue.fn = ue.prototype = {
		jquery: ne,
		constructor: ue,
		init: function(e, n, i) {
			var r, s;
			if (!e) return this;
			if ("string" == typeof e) {
				if (r = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : he.exec(e), !r || !r[1] && n) return !n || n.jquery ? (n || i).find(e) : this.constructor(n).find(e);
				if (r[1]) {
					if (n = n instanceof ue ? n[0] : n, ue.merge(this, ue.parseHTML(r[1], n && n.nodeType ? n.ownerDocument || n : X, !0)), me.test(r[1]) && ue.isPlainObject(n)) for (r in n) ue.isFunction(this[r]) ? this[r](n[r]) : this.attr(r, n[r]);
					return this
				}
				if (s = X.getElementById(r[2]), s && s.parentNode) {
					if (s.id !== r[2]) return i.find(e);
					this.length = 1, this[0] = s
				}
				return this.context = X, this.selector = e, this
			}
			return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : ue.isFunction(e) ? i.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), ue.makeArray(e, this))
		},
		
		selector: "",
		length: 0,
		toArray: function() {
			return se.call(this)
		},
		
		get: function(e) {
			return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e]
		},
		
		pushStack: function(e) {
			var t = ue.merge(this.constructor(), e);
			return t.prevObject = this, t.context = this.context, t
		},
		
		each: function(e, t) {
			return ue.each(this, e, t)
		},
		
		ready: function(e) {
			return ue.ready.promise().done(e), this
		},
		
		slice: function() {
			return this.pushStack(se.apply(this, arguments))
		},
		
		first: function() {
			return this.eq(0)
		},
		
		last: function() {
			return this.eq(-1)
		},
		
		eq: function(e) {
			var t = this.length,
				n = +e + (0 > e ? t : 0);
			return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
		},
		
		map: function(e) {
			return this.pushStack(ue.map(this, function(t, n) {
				return e.call(t, n, t)
			}))
		},
		
		end: function() {
			return this.prevObject || this.constructor(null)
		},
		
		push: re,
		sort: [].sort,
		splice: [].splice
	}, ue.fn.init.prototype = ue.fn, ue.extend = ue.fn.extend = function() {
		var e, n, i, r, s, o, a = arguments[0] || {},
			c = 1,
			l = arguments.length,
			u = !1;
		for ("boolean" == typeof a && (u = a, a = arguments[1] || {}, c = 2), "object" == typeof a || ue.isFunction(a) || (a = {}), l === c && (a = this, --c); l > c; c++) if (null != (s = arguments[c])) for (r in s) e = a[r], i = s[r], a !== i && (u && i && (ue.isPlainObject(i) || (n = ue.isArray(i))) ? (n ? (n = !1, o = e && ue.isArray(e) ? e : []) : o = e && ue.isPlainObject(e) ? e : {}, a[r] = ue.extend(u, o, i)) : i !== t && (a[r] = i));
		return a
	}, ue.extend({
		expando: "jQuery" + (ne + Math.random()).replace(/\D/g, ""),
		noConflict: function(t) {
			return e.$ === ue && (e.$ = Q), t && e.jQuery === ue && (e.jQuery = Z), ue
		},
		
		isReady: !1,
		readyWait: 1,
		holdReady: function(e) {
			e ? ue.readyWait++ : ue.ready(!0)
		},
		
		ready: function(e) {
			if (e === !0 ? !--ue.readyWait : !ue.isReady) {
				if (!X.body) return setTimeout(ue.ready);
				ue.isReady = !0, e !== !0 && --ue.readyWait > 0 || (q.resolveWith(X, [ue]), ue.fn.trigger && ue(X).trigger("ready").off("ready"))
			}
		},
		
		isFunction: function(e) {
			return "function" === ue.type(e)
		},
		
		isArray: Array.isArray ||
		function(e) {
			return "array" === ue.type(e)
		},
		
		isWindow: function(e) {
			return null != e && e == e.window
		},
		
		isNumeric: function(e) {
			return !isNaN(parseFloat(e)) && isFinite(e)
		},
		
		type: function(e) {
			return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? ee[ae.call(e)] || "object" : typeof e
		},
		
		isPlainObject: function(e) {
			var n;
			if (!e || "object" !== ue.type(e) || e.nodeType || ue.isWindow(e)) return !1;
			try {
				if (e.constructor && !ce.call(e, "constructor") && !ce.call(e.constructor.prototype, "isPrototypeOf")) return !1
			} catch (i) {
				return !1
			}
			if (ue.support.ownLast) for (n in e) return ce.call(e, n);
			for (n in e);
			return n === t || ce.call(e, n)
		},
		
		isEmptyObject: function(e) {
			var t;
			for (t in e) return !1;
			return !0
		},
		
		error: function(e) {
			throw Error(e)
		},
		
		parseHTML: function(e, t, n) {
			if (!e || "string" != typeof e) return null;
			"boolean" == typeof t && (n = t, t = !1), t = t || X;
			var i = me.exec(e),
				r = !n && [];
			return i ? [t.createElement(i[1])] : (i = ue.buildFragment([e], t, r), r && ue(r).remove(), ue.merge([], i.childNodes))
		},
		
		parseJSON: function(n) {
			return e.JSON && e.JSON.parse ? e.JSON.parse(n) : null === n ? n : "string" == typeof n && (n = ue.trim(n), n && ge.test(n.replace(ve, "@").replace(ye, "]").replace(_e, ""))) ? Function("return " + n)() : (ue.error("Invalid JSON: " + n), t)
		},
		
		parseXML: function(n) {
			var i, r;
			if (!n || "string" != typeof n) return null;
			try {
				e.DOMParser ? (r = new DOMParser, i = r.parseFromString(n, "text/xml")) : (i = new ActiveXObject("Microsoft.XMLDOM"), i.async = "false", i.loadXML(n))
			} catch (s) {
				i = t
			}
			return i && i.documentElement && !i.getElementsByTagName("parsererror").length || ue.error("Invalid XML: " + n), i
		},
		
		noop: function() {},
		
		globalEval: function(t) {
			t && ue.trim(t) && (e.execScript ||
			function(t) {
				e.eval.call(e, t)
			})(t)
		},
		
		camelCase: function(e) {
			return e.replace(be, "ms-").replace($e, we)
		},
		
		nodeName: function(e, t) {
			return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
		},
		
		each: function(e, t, i) {
			var r, s = 0,
				o = e.length,
				a = n(e);
			if (i) {
				if (a) for (; o > s && (r = t.apply(e[s], i), r !== !1); s++);
				else
				for (s in e) if (r = t.apply(e[s], i), r === !1) break
			} else if (a) for (; o > s && (r = t.call(e[s], s, e[s]), r !== !1); s++);
			else
			for (s in e) if (r = t.call(e[s], s, e[s]), r === !1) break;
			return e
		},
		
		trim: le && !le.call("\ufeff ") ?
		function(e) {
			return null == e ? "" : le.call(e)
		} : function(e) {
			return null == e ? "" : (e + "").replace(fe, "")
		},
		
		makeArray: function(e, t) {
			var i = t || [];
			return null != e && (n(Object(e)) ? ue.merge(i, "string" == typeof e ? [e] : e) : re.call(i, e)), i
		},
		
		inArray: function(e, t, n) {
			var i;
			if (t) {
				if (oe) return oe.call(t, e, n);
				for (i = t.length, n = n ? 0 > n ? Math.max(0, i + n) : n : 0; i > n; n++) if (n in t && t[n] === e) return n
			}
			return -1
		},
		
		merge: function(e, n) {
			var i = n.length,
				r = e.length,
				s = 0;
			if ("number" == typeof i) for (; i > s; s++) e[r++] = n[s];
			else
			for (; n[s] !== t;) e[r++] = n[s++];
			return e.length = r, e
		},
		
		grep: function(e, t, n) {
			var i, r = [],
				s = 0,
				o = e.length;
			for (n = !! n; o > s; s++) i = !! t(e[s], s), n !== i && r.push(e[s]);
			return r
		},
		
		map: function(e, t, i) {
			var r, s = 0,
				o = e.length,
				a = n(e),
				c = [];
			if (a) for (; o > s; s++) r = t(e[s], s, i), null != r && (c[c.length] = r);
			else
			for (s in e) r = t(e[s], s, i), null != r && (c[c.length] = r);
			return ie.apply([], c)
		},
		
		guid: 1,
		proxy: function(e, n) {
			var i, r, s;
			return "string" == typeof n && (s = e[n], n = e, e = s), ue.isFunction(e) ? (i = se.call(arguments, 2), r = function() {
				return e.apply(n || this, i.concat(se.call(arguments)))
			}, r.guid = e.guid = e.guid || ue.guid++, r) : t
		},
		
		access: function(e, n, i, r, s, o, a) {
			var c = 0,
				l = e.length,
				u = null == i;
			if ("object" === ue.type(i)) {
				s = !0;
				for (c in i) ue.access(e, n, c, i[c], !0, o, a)
			} else if (r !== t && (s = !0, ue.isFunction(r) || (a = !0), u && (a ? (n.call(e, r), n = null) : (u = n, n = function(e, t, n) {
				return u.call(ue(e), n)
			})), n)) for (; l > c; c++) n(e[c], i, a ? r : r.call(e[c], c, n(e[c], i)));
			return s ? e : u ? n.call(e) : l ? n(e[0], i) : o
		},
		
		now: function() {
			return (new Date).getTime()
		},
		
		swap: function(e, t, n, i) {
			var r, s, o = {};
			
			for (s in t) o[s] = e.style[s], e.style[s] = t[s];
			r = n.apply(e, i || []);
			for (s in t) e.style[s] = o[s];
			return r
		}
	}), ue.ready.promise = function(t) {
		if (!q) if (q = ue.Deferred(), "complete" === X.readyState) setTimeout(ue.ready);
		else if (X.addEventListener) X.addEventListener("DOMContentLoaded", je, !1), e.addEventListener("load", je, !1);
		else {
			X.attachEvent("onreadystatechange", je), e.attachEvent("onload", je);
			var n = !1;
			try {
				n = null == e.frameElement && X.documentElement
			} catch (i) {}
			n && n.doScroll &&
			function r() {
				if (!ue.isReady) {
					try {
						n.doScroll("left")
					} catch (e) {
						return setTimeout(r, 50)
					}
					xe(), ue.ready()
				}
			}()
		}
		return q.promise(t)
	}, ue.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
		ee["[object " + t + "]"] = t.toLowerCase()
	}), W = ue(X), function(e, t) {
		function n(e, t, n, i) {
			var r, s, o, a, c, l, u, d, h, m;
			if ((t ? t.ownerDocument || t : z) !== A && E(t), t = t || A, n = n || [], !e || "string" != typeof e) return n;
			if (1 !== (a = t.nodeType) && 9 !== a) return [];
			if (U && !i) {
				if (r = ye.exec(e)) if (o = r[1]) {
					if (9 === a) {
						if (s = t.getElementById(o), !s || !s.parentNode) return n;
						if (s.id === o) return n.push(s), n
					} else if (t.ownerDocument && (s = t.ownerDocument.getElementById(o)) && M(t, s) && s.id === o) return n.push(s), n
				} else {
					if (r[2]) return ee.apply(n, t.getElementsByTagName(e)), n;
					if ((o = r[3]) && j.getElementsByClassName && t.getElementsByClassName) return ee.apply(n, t.getElementsByClassName(o)), n
				}
				if (j.qsa && (!R || !R.test(e))) {
					if (d = u = I, h = t, m = 9 === a && e, 1 === a && "object" !== t.nodeName.toLowerCase()) {
						for (l = p(e), (u = t.getAttribute("id")) ? d = u.replace(we, "\\$&") : t.setAttribute("id", d), d = "[id='" + d + "'] ", c = l.length; c--;) l[c] = d + f(l[c]);
						h = fe.test(e) && t.parentNode || t, m = l.join(",")
					}
					if (m) try {
						return ee.apply(n, h.querySelectorAll(m)), n
					} catch (g) {} finally {
						u || t.removeAttribute("id")
					}
				}
			}
			return $(e.replace(le, "$1"), t, n, i)
		}
		function i() {
			function e(n, i) {
				return t.push(n += " ") > C.cacheLength && delete e[t.shift()], e[n] = i
			}
			var t = [];
			return e
		}
		function r(e) {
			return e[I] = !0, e
		}
		function s(e) {
			var t = A.createElement("div");
			try {
				return !!e(t)
			} catch (n) {
				return !1
			} finally {
				t.parentNode && t.parentNode.removeChild(t), t = null
			}
		}
		function o(e, t) {
			for (var n = e.split("|"), i = e.length; i--;) C.attrHandle[n[i]] = t
		}
		function a(e, t) {
			var n = t && e,
				i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || Y) - (~e.sourceIndex || Y);
			if (i) return i;
			if (n) for (; n = n.nextSibling;) if (n === t) return -1;
			return e ? 1 : -1
		}
		function c(e) {
			return function(t) {
				var n = t.nodeName.toLowerCase();
				
				return "input" === n && t.type === e
			}
		}
		function l(e) {
			return function(t) {
				var n = t.nodeName.toLowerCase();
				
				return ("input" === n || "button" === n) && t.type === e
			}
		}
		function u(e) {
			return r(function(t) {
				return t = +t, r(function(n, i) {
					for (var r, s = e([], n.length, t), o = s.length; o--;) n[r = s[o]] && (n[r] = !(i[r] = n[r]))
				})
			})
		}
		function d() {}
		function p(e, t) {
			var i, r, s, o, a, c, l, u = V[e + " "];
			if (u) return t ? 0 : u.slice(0);
			for (a = e, c = [], l = C.preFilter; a;) {
				(!i || (r = de.exec(a))) && (r && (a = a.slice(r[0].length) || a), c.push(s = [])), i = !1, (r = pe.exec(a)) && (i = r.shift(), s.push({
					value: i,
					type: r[0].replace(le, " ")
				}), a = a.slice(i.length));
				for (o in C.filter)!(r = _e[o].exec(a)) || l[o] && !(r = l[o](r)) || (i = r.shift(), s.push({
					value: i,
					type: o,
					matches: r
				}), a = a.slice(i.length));
				if (!i) break
			}
			return t ? a.length : a ? n.error(e) : V(e, c).slice(0)
		}
		function f(e) {
			for (var t = 0, n = e.length, i = ""; n > t; t++) i += e[t].value;
			return i
		}
		function h(e, t, n) {
			var i = t.dir,
				r = n && "parentNode" === i,
				s = B++;
			return t.first ?
			function(t, n, s) {
				for (; t = t[i];) if (1 === t.nodeType || r) return e(t, n, s)
			} : function(t, n, o) {
				var a, c, l, u = L + " " + s;
				if (o) {
					for (; t = t[i];) if ((1 === t.nodeType || r) && e(t, n, o)) return !0
				} else
				for (; t = t[i];) if (1 === t.nodeType || r) if (l = t[I] || (t[I] = {}), (c = l[i]) && c[0] === u) {
					if ((a = c[1]) === !0 || a === x) return a === !0
				} else if (c = l[i] = [u], c[1] = e(t, n, o) || x, c[1] === !0) return !0
			}
		}
		function m(e) {
			return e.length > 1 ?
			function(t, n, i) {
				for (var r = e.length; r--;) if (!e[r](t, n, i)) return !1;
				return !0
			} : e[0]
		}
		function g(e, t, n, i, r) {
			for (var s, o = [], a = 0, c = e.length, l = null != t; c > a; a++)(s = e[a]) && (!n || n(s, i, r)) && (o.push(s), l && t.push(a));
			return o
		}
		function _(e, t, n, i, s, o) {
			return i && !i[I] && (i = _(i)), s && !s[I] && (s = _(s, o)), r(function(r, o, a, c) {
				var l, u, d, p = [],
					f = [],
					h = o.length,
					m = r || b(t || "*", a.nodeType ? [a] : a, []),
					_ = !e || !r && t ? m : g(m, p, e, a, c),
					v = n ? s || (r ? e : h || i) ? [] : o : _;
				if (n && n(_, v, a, c), i) for (l = g(v, f), i(l, [], a, c), u = l.length; u--;)(d = l[u]) && (v[f[u]] = !(_[f[u]] = d));
				if (r) {
					if (s || e) {
						if (s) {
							for (l = [], u = v.length; u--;)(d = v[u]) && l.push(_[u] = d);
							s(null, v = [], l, c)
						}
						for (u = v.length; u--;)(d = v[u]) && (l = s ? ne.call(r, d) : p[u]) > -1 && (r[l] = !(o[l] = d))
					}
				} else v = g(v === o ? v.splice(h, v.length) : v), s ? s(null, o, v, c) : ee.apply(o, v)
			})
		}
		function v(e) {
			for (var t, n, i, r = e.length, s = C.relative[e[0].type], o = s || C.relative[" "], a = s ? 1 : 0, c = h(function(e) {
				return e === t
			}, o, !0), l = h(function(e) {
				return ne.call(t, e) > -1
			}, o, !0), u = [function(e, n, i) {
				return !s && (i || n !== O) || ((t = n).nodeType ? c(e, n, i) : l(e, n, i))
			}]; r > a; a++) if (n = C.relative[e[a].type]) u = [h(m(u), n)];
			else {
				if (n = C.filter[e[a].type].apply(null, e[a].matches), n[I]) {
					for (i = ++a; r > i && !C.relative[e[i].type]; i++);
					return _(a > 1 && m(u), a > 1 && f(e.slice(0, a - 1).concat({
						value: " " === e[a - 2].type ? "*" : ""
					})).replace(le, "$1"), n, i > a && v(e.slice(a, i)), r > i && v(e = e.slice(i)), r > i && f(e))
				}
				u.push(n)
			}
			return m(u)
		}
		function y(e, t) {
			var i = 0,
				s = t.length > 0,
				o = e.length > 0,
				a = function(r, a, c, l, u) {
					var d, p, f, h = [],
						m = 0,
						_ = "0",
						v = r && [],
						y = null != u,
						b = O,
						$ = r || o && C.find.TAG("*", u && a.parentNode || a),
						w = L += null == b ? 1 : Math.random() || .1;
					for (y && (O = a !== A && a, x = i); null != (d = $[_]); _++) {
						if (o && d) {
							for (p = 0; f = e[p++];) if (f(d, a, c)) {
								l.push(d);
								break
							}
							y && (L = w, x = ++i)
						}
						s && ((d = !f && d) && m--, r && v.push(d))
					}
					if (m += _, s && _ !== m) {
						for (p = 0; f = t[p++];) f(v, h, a, c);
						if (r) {
							if (m > 0) for (; _--;) v[_] || h[_] || (h[_] = Z.call(l));
							h = g(h)
						}
						ee.apply(l, h), y && !r && h.length > 0 && m + t.length > 1 && n.uniqueSort(l)
					}
					return y && (L = w, O = b), v
				};
			
			return s ? r(a) : a
		}
		function b(e, t, i) {
			for (var r = 0, s = t.length; s > r; r++) n(e, t[r], i);
			return i
		}
		function $(e, t, n, i) {
			var r, s, o, a, c, l = p(e);
			if (!i && 1 === l.length) {
				if (s = l[0] = l[0].slice(0), s.length > 2 && "ID" === (o = s[0]).type && j.getById && 9 === t.nodeType && U && C.relative[s[1].type]) {
					if (t = (C.find.ID(o.matches[0].replace(je, xe), t) || [])[0], !t) return n;
					e = e.slice(s.shift().value.length)
				}
				for (r = _e.needsContext.test(e) ? 0 : s.length; r-- && (o = s[r], !C.relative[a = o.type]);) if ((c = C.find[a]) && (i = c(o.matches[0].replace(je, xe), fe.test(s[0].type) && t.parentNode || t))) {
					if (s.splice(r, 1), e = i.length && f(s), !e) return ee.apply(n, i), n;
					break
				}
			}
			return T(e, l)(i, t, !U, n, fe.test(e)), n
		}
		var w, j, x, C, k, N, T, O, S, E, A, D, U, R, F, P, M, I = "sizzle" + -new Date,
			z = e.document,
			L = 0,
			B = 0,
			J = i(),
			V = i(),
			H = i(),
			q = !1,
			W = function(e, t) {
				return e === t ? (q = !0, 0) : 0
			},
			G = typeof t,
			Y = 1 << 31,
			X = {}.hasOwnProperty,
			K = [],
			Z = K.pop,
			Q = K.push,
			ee = K.push,
			te = K.slice,
			ne = K.indexOf ||
			function(e) {
				for (var t = 0, n = this.length; n > t; t++) if (this[t] === e) return t;
				return -1
			},
			ie = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
			re = "[\\x20\\t\\r\\n\\f]",
			se = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
			oe = se.replace("w", "w#"),
			ae = "\\[" + re + "*(" + se + ")" + re + "*(?:([*^$|!~]?=)" + re + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + oe + ")|)|)" + re + "*\\]",
			ce = ":(" + se + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + ae.replace(3, 8) + ")*)|.*)\\)|)",
			le = RegExp("^" + re + "+|((?:^|[^\\\\])(?:\\\\.)*)" + re + "+$", "g"),
			de = RegExp("^" + re + "*," + re + "*"),
			pe = RegExp("^" + re + "*([>+~]|" + re + ")" + re + "*"),
			fe = RegExp(re + "*[+~]"),
			he = RegExp("=" + re + "*([^\\]'\"]*)" + re + "*\\]", "g"),
			me = RegExp(ce),
			ge = RegExp("^" + oe + "$"),
			_e = {
				ID: RegExp("^#(" + se + ")"),
				CLASS: RegExp("^\\.(" + se + ")"),
				TAG: RegExp("^(" + se.replace("w", "w*") + ")"),
				ATTR: RegExp("^" + ae),
				PSEUDO: RegExp("^" + ce),
				CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + re + "*(even|odd|(([+-]|)(\\d*)n|)" + re + "*(?:([+-]|)" + re + "*(\\d+)|))" + re + "*\\)|)", "i"),
				bool: RegExp("^(?:" + ie + ")$", "i"),
				needsContext: RegExp("^" + re + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + re + "*((?:-\\d)?\\d*)" + re + "*\\)|)(?=[^-]|$)", "i")
			},
			ve = /^[^{]+\{\s*\[native \w/,
			ye = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
			be = /^(?:input|select|textarea|button)$/i,
			$e = /^h\d$/i,
			we = /'|\\/g,
			je = RegExp("\\\\([\\da-f]{1,6}" + re + "?|(" + re + ")|.)", "ig"),
			xe = function(e, t, n) {
				var i = "0x" + t - 65536;
				return i !== i || n ? t : 0 > i ? String.fromCharCode(i + 65536) : String.fromCharCode(55296 | i >> 10, 56320 | 1023 & i)
			};
		
		try {
			ee.apply(K = te.call(z.childNodes), z.childNodes), K[z.childNodes.length].nodeType
		} catch (Ce) {
			ee = {
				apply: K.length ?
				function(e, t) {
					Q.apply(e, te.call(t))
				} : function(e, t) {
					for (var n = e.length, i = 0; e[n++] = t[i++];);
					e.length = n - 1
				}
			}
		}
		N = n.isXML = function(e) {
			var t = e && (e.ownerDocument || e).documentElement;
			return !!t && "HTML" !== t.nodeName
		}, j = n.support = {}, E = n.setDocument = function(e) {
			var n = e ? e.ownerDocument || e : z,
				i = n.defaultView;
			return n !== A && 9 === n.nodeType && n.documentElement ? (A = n, D = n.documentElement, U = !N(n), i && i.attachEvent && i !== i.top && i.attachEvent("onbeforeunload", function() {
				E()
			}), j.attributes = s(function(e) {
				return e.className = "i", !e.getAttribute("className")
			}), j.getElementsByTagName = s(function(e) {
				return e.appendChild(n.createComment("")), !e.getElementsByTagName("*").length
			}), j.getElementsByClassName = s(function(e) {
				return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length
			}), j.getById = s(function(e) {
				return D.appendChild(e).id = I, !n.getElementsByName || !n.getElementsByName(I).length
			}), j.getById ? (C.find.ID = function(e, t) {
				if (typeof t.getElementById !== G && U) {
					var n = t.getElementById(e);
					return n && n.parentNode ? [n] : []
				}
			}, C.filter.ID = function(e) {
				var t = e.replace(je, xe);
				return function(e) {
					return e.getAttribute("id") === t
				}
			}) : (delete C.find.ID, C.filter.ID = function(e) {
				var t = e.replace(je, xe);
				return function(e) {
					var n = typeof e.getAttributeNode !== G && e.getAttributeNode("id");
					return n && n.value === t
				}
			}), C.find.TAG = j.getElementsByTagName ?
			function(e, n) {
				return typeof n.getElementsByTagName !== G ? n.getElementsByTagName(e) : t
			} : function(e, t) {
				var n, i = [],
					r = 0,
					s = t.getElementsByTagName(e);
				if ("*" === e) {
					for (; n = s[r++];) 1 === n.nodeType && i.push(n);
					return i
				}
				return s
			}, C.find.CLASS = j.getElementsByClassName &&
			function(e, n) {
				return typeof n.getElementsByClassName !== G && U ? n.getElementsByClassName(e) : t
			}, F = [], R = [], (j.qsa = ve.test(n.querySelectorAll)) && (s(function(e) {
				e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || R.push("\\[" + re + "*(?:value|" + ie + ")"), e.querySelectorAll(":checked").length || R.push(":checked")
			}), s(function(e) {
				var t = n.createElement("input");
				t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("t", ""), e.querySelectorAll("[t^='']").length && R.push("[*^$]=" + re + "*(?:''|\"\")"), e.querySelectorAll(":enabled").length || R.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), R.push(",.*:")
			})), (j.matchesSelector = ve.test(P = D.webkitMatchesSelector || D.mozMatchesSelector || D.oMatchesSelector || D.msMatchesSelector)) && s(function(e) {
				j.disconnectedMatch = P.call(e, "div"), P.call(e, "[s!='']:x"), F.push("!=", ce)
			}), R = R.length && RegExp(R.join("|")), F = F.length && RegExp(F.join("|")), M = ve.test(D.contains) || D.compareDocumentPosition ?
			function(e, t) {
				var n = 9 === e.nodeType ? e.documentElement : e,
					i = t && t.parentNode;
				return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
			} : function(e, t) {
				if (t) for (; t = t.parentNode;) if (t === e) return !0;
				return !1
			}, W = D.compareDocumentPosition ?
			function(e, t) {
				if (e === t) return q = !0, 0;
				var i = t.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(t);
				return i ? 1 & i || !j.sortDetached && t.compareDocumentPosition(e) === i ? e === n || M(z, e) ? -1 : t === n || M(z, t) ? 1 : S ? ne.call(S, e) - ne.call(S, t) : 0 : 4 & i ? -1 : 1 : e.compareDocumentPosition ? -1 : 1
			} : function(e, t) {
				var i, r = 0,
					s = e.parentNode,
					o = t.parentNode,
					c = [e],
					l = [t];
				if (e === t) return q = !0, 0;
				if (!s || !o) return e === n ? -1 : t === n ? 1 : s ? -1 : o ? 1 : S ? ne.call(S, e) - ne.call(S, t) : 0;
				if (s === o) return a(e, t);
				for (i = e; i = i.parentNode;) c.unshift(i);
				for (i = t; i = i.parentNode;) l.unshift(i);
				for (; c[r] === l[r];) r++;
				return r ? a(c[r], l[r]) : c[r] === z ? -1 : l[r] === z ? 1 : 0
			}, n) : A
		}, n.matches = function(e, t) {
			return n(e, null, null, t)
		}, n.matchesSelector = function(e, t) {
			if ((e.ownerDocument || e) !== A && E(e), t = t.replace(he, "='$1']"), !(!j.matchesSelector || !U || F && F.test(t) || R && R.test(t))) try {
				var i = P.call(e, t);
				if (i || j.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i
			} catch (r) {}
			return n(t, A, null, [e]).length > 0
		}, n.contains = function(e, t) {
			return (e.ownerDocument || e) !== A && E(e), M(e, t)
		}, n.attr = function(e, n) {
			(e.ownerDocument || e) !== A && E(e);
			var i = C.attrHandle[n.toLowerCase()],
				r = i && X.call(C.attrHandle, n.toLowerCase()) ? i(e, n, !U) : t;
			return r === t ? j.attributes || !U ? e.getAttribute(n) : (r = e.getAttributeNode(n)) && r.specified ? r.value : null : r
		}, n.error = function(e) {
			throw Error("Syntax error, unrecognized expression: " + e)
		}, n.uniqueSort = function(e) {
			var t, n = [],
				i = 0,
				r = 0;
			if (q = !j.detectDuplicates, S = !j.sortStable && e.slice(0), e.sort(W), q) {
				for (; t = e[r++];) t === e[r] && (i = n.push(r));
				for (; i--;) e.splice(n[i], 1)
			}
			return e
		}, k = n.getText = function(e) {
			var t, n = "",
				i = 0,
				r = e.nodeType;
			if (r) {
				if (1 === r || 9 === r || 11 === r) {
					if ("string" == typeof e.textContent) return e.textContent;
					for (e = e.firstChild; e; e = e.nextSibling) n += k(e)
				} else if (3 === r || 4 === r) return e.nodeValue
			} else
			for (; t = e[i]; i++) n += k(t);
			return n
		}, C = n.selectors = {
			cacheLength: 50,
			createPseudo: r,
			match: _e,
			attrHandle: {},
			
			find: {},
			
			relative: {
				">": {
					dir: "parentNode",
					first: !0
				},
				
				" ": {
					dir: "parentNode"
				},
				
				"+": {
					dir: "previousSibling",
					first: !0
				},
				
				"~": {
					dir: "previousSibling"
				}
			},
			
			preFilter: {
				ATTR: function(e) {
					return e[1] = e[1].replace(je, xe), e[3] = (e[4] || e[5] || "").replace(je, xe), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
				},
				
				CHILD: function(e) {
					return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || n.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && n.error(e[0]), e
				},
				
				PSEUDO: function(e) {
					var n, i = !e[5] && e[2];
					return _e.CHILD.test(e[0]) ? null : (e[3] && e[4] !== t ? e[2] = e[4] : i && me.test(i) && (n = p(i, !0)) && (n = i.indexOf(")", i.length - n) - i.length) && (e[0] = e[0].slice(0, n), e[2] = i.slice(0, n)), e.slice(0, 3))
				}
			},
			
			filter: {
				TAG: function(e) {
					var t = e.replace(je, xe).toLowerCase();
					
					return "*" === e ?
					function() {
						return !0
					} : function(e) {
						return e.nodeName && e.nodeName.toLowerCase() === t
					}
				},
				
				CLASS: function(e) {
					var t = J[e + " "];
					return t || (t = RegExp("(^|" + re + ")" + e + "(" + re + "|$)")) && J(e, function(e) {
						return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== G && e.getAttribute("class") || "")
					})
				},
				
				ATTR: function(e, t, i) {
					return function(r) {
						var s = n.attr(r, e);
						return null == s ? "!=" === t : !t || (s += "", "=" === t ? s === i : "!=" === t ? s !== i : "^=" === t ? i && 0 === s.indexOf(i) : "*=" === t ? i && s.indexOf(i) > -1 : "$=" === t ? i && s.slice(-i.length) === i : "~=" === t ? (" " + s + " ").indexOf(i) > -1 : "|=" === t && (s === i || s.slice(0, i.length + 1) === i + "-"))
					}
				},
				
				CHILD: function(e, t, n, i, r) {
					var s = "nth" !== e.slice(0, 3),
						o = "last" !== e.slice(-4),
						a = "of-type" === t;
					return 1 === i && 0 === r ?
					function(e) {
						return !!e.parentNode
					} : function(t, n, c) {
						var l, u, d, p, f, h, m = s !== o ? "nextSibling" : "previousSibling",
							g = t.parentNode,
							_ = a && t.nodeName.toLowerCase(),
							v = !c && !a;
						if (g) {
							if (s) {
								for (; m;) {
									for (d = t; d = d[m];) if (a ? d.nodeName.toLowerCase() === _ : 1 === d.nodeType) return !1;
									h = m = "only" === e && !h && "nextSibling"
								}
								return !0
							}
							if (h = [o ? g.firstChild : g.lastChild], o && v) {
								for (u = g[I] || (g[I] = {}), l = u[e] || [], f = l[0] === L && l[1], p = l[0] === L && l[2], d = f && g.childNodes[f]; d = ++f && d && d[m] || (p = f = 0) || h.pop();) if (1 === d.nodeType && ++p && d === t) {
									u[e] = [L, f, p];
									break
								}
							} else if (v && (l = (t[I] || (t[I] = {}))[e]) && l[0] === L) p = l[1];
							else
							for (;
							(d = ++f && d && d[m] || (p = f = 0) || h.pop()) && ((a ? d.nodeName.toLowerCase() !== _ : 1 !== d.nodeType) || !++p || (v && ((d[I] || (d[I] = {}))[e] = [L, p]), d !== t)););
							return p -= r, p === i || 0 === p % i && p / i >= 0
						}
					}
				},
				
				PSEUDO: function(e, t) {
					var i, s = C.pseudos[e] || C.setFilters[e.toLowerCase()] || n.error("unsupported pseudo: " + e);
					return s[I] ? s(t) : s.length > 1 ? (i = [e, e, "", t], C.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function(e, n) {
						for (var i, r = s(e, t), o = r.length; o--;) i = ne.call(e, r[o]), e[i] = !(n[i] = r[o])
					}) : function(e) {
						return s(e, 0, i)
					}) : s
				}
			},
			
			pseudos: {
				not: r(function(e) {
					var t = [],
						n = [],
						i = T(e.replace(le, "$1"));
					return i[I] ? r(function(e, t, n, r) {
						for (var s, o = i(e, null, r, []), a = e.length; a--;)(s = o[a]) && (e[a] = !(t[a] = s))
					}) : function(e, r, s) {
						return t[0] = e, i(t, null, s, n), !n.pop()
					}
				}),
				has: r(function(e) {
					return function(t) {
						return n(e, t).length > 0
					}
				}),
				contains: r(function(e) {
					return function(t) {
						return (t.textContent || t.innerText || k(t)).indexOf(e) > -1
					}
				}),
				lang: r(function(e) {
					return ge.test(e || "") || n.error("unsupported lang: " + e), e = e.replace(je, xe).toLowerCase(), function(t) {
						var n;
						do
						if (n = U ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-");
						while ((t = t.parentNode) && 1 === t.nodeType);
						return !1
					}
				}),
				target: function(t) {
					var n = e.location && e.location.hash;
					return n && n.slice(1) === t.id
				},
				
				root: function(e) {
					return e === D
				},
				
				focus: function(e) {
					return e === A.activeElement && (!A.hasFocus || A.hasFocus()) && !! (e.type || e.href || ~e.tabIndex)
				},
				
				enabled: function(e) {
					return e.disabled === !1
				},
				
				disabled: function(e) {
					return e.disabled === !0
				},
				
				checked: function(e) {
					var t = e.nodeName.toLowerCase();
					
					return "input" === t && !! e.checked || "option" === t && !! e.selected
				},
				
				selected: function(e) {
					return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
				},
				
				empty: function(e) {
					for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType) return !1;
					return !0
				},
				
				parent: function(e) {
					return !C.pseudos.empty(e)
				},
				
				header: function(e) {
					return $e.test(e.nodeName)
				},
				
				input: function(e) {
					return be.test(e.nodeName)
				},
				
				button: function(e) {
					var t = e.nodeName.toLowerCase();
					
					return "input" === t && "button" === e.type || "button" === t
				},
				
				text: function(e) {
					var t;
					return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type)
				},
				
				first: u(function() {
					return [0]
				}),
				last: u(function(e, t) {
					return [t - 1]
				}),
				eq: u(function(e, t, n) {
					return [0 > n ? n + t : n]
				}),
				even: u(function(e, t) {
					for (var n = 0; t > n; n += 2) e.push(n);
					return e
				}),
				odd: u(function(e, t) {
					for (var n = 1; t > n; n += 2) e.push(n);
					return e
				}),
				lt: u(function(e, t, n) {
					for (var i = 0 > n ? n + t : n; --i >= 0;) e.push(i);
					return e
				}),
				gt: u(function(e, t, n) {
					for (var i = 0 > n ? n + t : n; t > ++i;) e.push(i);
					return e
				})
			}
		}, C.pseudos.nth = C.pseudos.eq;
		for (w in {
			radio: !0,
			checkbox: !0,
			file: !0,
			password: !0,
			image: !0
		}) C.pseudos[w] = c(w);
		for (w in {
			submit: !0,
			reset: !0
		}) C.pseudos[w] = l(w);
		d.prototype = C.filters = C.pseudos, C.setFilters = new d, T = n.compile = function(e, t) {
			var n, i = [],
				r = [],
				s = H[e + " "];
			if (!s) {
				for (t || (t = p(e)), n = t.length; n--;) s = v(t[n]), s[I] ? i.push(s) : r.push(s);
				s = H(e, y(r, i))
			}
			return s
		}, j.sortStable = I.split("").sort(W).join("") === I, j.detectDuplicates = q, E(), j.sortDetached = s(function(e) {
			return 1 & e.compareDocumentPosition(A.createElement("div"))
		}), s(function(e) {
			return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
		}) || o("type|href|height|width", function(e, n, i) {
			return i ? t : e.getAttribute(n, "type" === n.toLowerCase() ? 1 : 2)
		}), j.attributes && s(function(e) {
			return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
		}) || o("value", function(e, n, i) {
			return i || "input" !== e.nodeName.toLowerCase() ? t : e.defaultValue
		}), s(function(e) {
			return null == e.getAttribute("disabled")
		}) || o(ie, function(e, n, i) {
			var r;
			return i ? t : (r = e.getAttributeNode(n)) && r.specified ? r.value : e[n] === !0 ? n.toLowerCase() : null
		}), ue.find = n, ue.expr = n.selectors, ue.expr[":"] = ue.expr.pseudos, ue.unique = n.uniqueSort, ue.text = n.getText, ue.isXMLDoc = n.isXML, ue.contains = n.contains
	}(e);
	var Ce = {};
	
	ue.Callbacks = function(e) {
		e = "string" == typeof e ? Ce[e] || i(e) : ue.extend({}, e);
		var n, r, s, o, a, c, l = [],
			u = !e.once && [],
			d = function(t) {
				for (r = e.memory && t, s = !0, a = c || 0, c = 0, o = l.length, n = !0; l && o > a; a++) if (l[a].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
					r = !1;
					break
				}
				n = !1, l && (u ? u.length && d(u.shift()) : r ? l = [] : p.disable())
			},
			p = {
				add: function() {
					if (l) {
						var t = l.length;
						!
						function i(t) {
							ue.each(t, function(t, n) {
								var r = ue.type(n);
								"function" === r ? e.unique && p.has(n) || l.push(n) : n && n.length && "string" !== r && i(n)
							})
						}(arguments), n ? o = l.length : r && (c = t, d(r))
					}
					return this
				},
				
				remove: function() {
					return l && ue.each(arguments, function(e, t) {
						for (var i;
						(i = ue.inArray(t, l, i)) > -1;) l.splice(i, 1), n && (o >= i && o--, a >= i && a--)
					}), this
				},
				
				has: function(e) {
					return e ? ue.inArray(e, l) > -1 : !(!l || !l.length)
				},
				
				empty: function() {
					return l = [], o = 0, this
				},
				
				disable: function() {
					return l = u = r = t, this
				},
				
				disabled: function() {
					return !l
				},
				
				lock: function() {
					return u = t, r || p.disable(), this
				},
				
				locked: function() {
					return !u
				},
				
				fireWith: function(e, t) {
					return !l || s && !u || (t = t || [], t = [e, t.slice ? t.slice() : t], n ? u.push(t) : d(t)), this
				},
				
				fire: function() {
					return p.fireWith(this, arguments), this
				},
				
				fired: function() {
					return !!s
				}
			};
		
		return p
	}, ue.extend({
		Deferred: function(e) {
			var t = [
				["resolve", "done", ue.Callbacks("once memory"), "resolved"],
				["reject", "fail", ue.Callbacks("once memory"), "rejected"],
				["notify", "progress", ue.Callbacks("memory")]
			],
				n = "pending",
				i = {
					state: function() {
						return n
					},
					
					always: function() {
						return r.done(arguments).fail(arguments), this
					},
					
					then: function() {
						var e = arguments;
						return ue.Deferred(function(n) {
							ue.each(t, function(t, s) {
								var o = s[0],
									a = ue.isFunction(e[t]) && e[t];
								r[s[1]](function() {
									var e = a && a.apply(this, arguments);
									e && ue.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o + "With"](this === i ? n.promise() : this, a ? [e] : arguments)
								})
							}), e = null
						}).promise()
					},
					
					promise: function(e) {
						return null != e ? ue.extend(e, i) : i
					}
				},
				r = {};
			
			return i.pipe = i.then, ue.each(t, function(e, s) {
				var o = s[2],
					a = s[3];
				i[s[1]] = o.add, a && o.add(function() {
					n = a
				}, t[1 ^ e][2].disable, t[2][2].lock), r[s[0]] = function() {
					return r[s[0] + "With"](this === r ? i : this, arguments), this
				}, r[s[0] + "With"] = o.fireWith
			}), i.promise(r), e && e.call(r, r), r
		},
		
		when: function(e) {
			var t, n, i, r = 0,
				s = se.call(arguments),
				o = s.length,
				a = 1 !== o || e && ue.isFunction(e.promise) ? o : 0,
				c = 1 === a ? e : ue.Deferred(),
				l = function(e, n, i) {
					return function(r) {
						n[e] = this, i[e] = arguments.length > 1 ? se.call(arguments) : r, i === t ? c.notifyWith(n, i) : --a || c.resolveWith(n, i)
					}
				};
			
			if (o > 1) for (t = Array(o), n = Array(o), i = Array(o); o > r; r++) s[r] && ue.isFunction(s[r].promise) ? s[r].promise().done(l(r, i, s)).fail(c.reject).progress(l(r, n, t)) : --a;
			return a || c.resolveWith(i, s), c.promise()
		}
	}), ue.support = function(t) {
		var n, i, r, s, o, a, c, l, u, d = X.createElement("div");
		if (d.setAttribute("className", "t"), d.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = d.getElementsByTagName("*") || [], i = d.getElementsByTagName("a")[0], !i || !i.style || !n.length) return t;
		s = X.createElement("select"), a = s.appendChild(X.createElement("option")), r = d.getElementsByTagName("input")[0], i.style.cssText = "top:1px;float:left;opacity:.5", t.getSetAttribute = "t" !== d.className, t.leadingWhitespace = 3 === d.firstChild.nodeType, t.tbody = !d.getElementsByTagName("tbody").length, t.htmlSerialize = !! d.getElementsByTagName("link").length, t.style = /top/.test(i.getAttribute("style")), t.hrefNormalized = "/a" === i.getAttribute("href"), t.opacity = /^0.5/.test(i.style.opacity), t.cssFloat = !! i.style.cssFloat, t.checkOn = !! r.value, t.optSelected = a.selected, t.enctype = !! X.createElement("form").enctype, t.html5Clone = "<:nav></:nav>" !== X.createElement("nav").cloneNode(!0).outerHTML, t.inlineBlockNeedsLayout = !1, t.shrinkWrapBlocks = !1, t.pixelPosition = !1, t.deleteExpando = !0, t.noCloneEvent = !0, t.reliableMarginRight = !0, t.boxSizingReliable = !0, r.checked = !0, t.noCloneChecked = r.cloneNode(!0).checked, s.disabled = !0, t.optDisabled = !a.disabled;
		try {
			delete d.test
		} catch (p) {
			t.deleteExpando = !1
		}
		r = X.createElement("input"), r.setAttribute("value", ""), t.input = "" === r.getAttribute("value"), r.value = "t", r.setAttribute("type", "radio"), t.radioValue = "t" === r.value, r.setAttribute("checked", "t"), r.setAttribute("name", "t"), o = X.createDocumentFragment(), o.appendChild(r), t.appendChecked = r.checked, t.checkClone = o.cloneNode(!0).cloneNode(!0).lastChild.checked, d.attachEvent && (d.attachEvent("onclick", function() {
			t.noCloneEvent = !1
		}), d.cloneNode(!0).click());
		for (u in {
			submit: !0,
			change: !0,
			focusin: !0
		}) d.setAttribute(c = "on" + u, "t"), t[u + "Bubbles"] = c in e || d.attributes[c].expando === !1;
		d.style.backgroundClip = "content-box", d.cloneNode(!0).style.backgroundClip = "", t.clearCloneStyle = "content-box" === d.style.backgroundClip;
		for (u in ue(t)) break;
		return t.ownLast = "0" !== u, ue(function() {
			var n, i, r, s = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
				o = X.getElementsByTagName("body")[0];
			o && (n = X.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", o.appendChild(n).appendChild(d), d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", r = d.getElementsByTagName("td"), r[0].style.cssText = "padding:0;margin:0;border:0;display:none", l = 0 === r[0].offsetHeight, r[0].style.display = "", r[1].style.display = "none", t.reliableHiddenOffsets = l && 0 === r[0].offsetHeight, d.innerHTML = "", d.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", ue.swap(o, null != o.style.zoom ? {
				zoom: 1
			} : {}, function() {
				t.boxSizing = 4 === d.offsetWidth
			}), e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(d, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(d, null) || {
				width: "4px"
			}).width, i = d.appendChild(X.createElement("div")), i.style.cssText = d.style.cssText = s, i.style.marginRight = i.style.width = "0", d.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(i, null) || {}).marginRight)), typeof d.style.zoom !== G && (d.innerHTML = "", d.style.cssText = s + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = 3 === d.offsetWidth, d.style.display = "block", d.innerHTML = "<div></div>", d.firstChild.style.width = "5px", t.shrinkWrapBlocks = 3 !== d.offsetWidth, t.inlineBlockNeedsLayout && (o.style.zoom = 1)), o.removeChild(n), n = d = r = i = null)
		}), n = s = o = a = i = r = null, t
	}({});
	
	var ke = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
		Ne = /([A-Z])/g;
	ue.extend({
		cache: {},
		
		noData: {
			applet: !0,
			embed: !0,
			object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
		},
		
		hasData: function(e) {
			return e = e.nodeType ? ue.cache[e[ue.expando]] : e[ue.expando], !! e && !a(e)
		},
		
		data: function(e, t, n) {
			return r(e, t, n)
		},
		
		removeData: function(e, t) {
			return s(e, t)
		},
		
		_data: function(e, t, n) {
			return r(e, t, n, !0)
		},
		
		_removeData: function(e, t) {
			return s(e, t, !0)
		},
		
		acceptData: function(e) {
			if (e.nodeType && 1 !== e.nodeType && 9 !== e.nodeType) return !1;
			var t = e.nodeName && ue.noData[e.nodeName.toLowerCase()];
			return !t || t !== !0 && e.getAttribute("classid") === t
		}
	}), ue.fn.extend({
		data: function(e, n) {
			var i, r, s = null,
				a = 0,
				c = this[0];
			if (e === t) {
				if (this.length && (s = ue.data(c), 1 === c.nodeType && !ue._data(c, "parsedAttrs"))) {
					for (i = c.attributes; i.length > a; a++) r = i[a].name, 0 === r.indexOf("data-") && (r = ue.camelCase(r.slice(5)), o(c, r, s[r]));
					ue._data(c, "parsedAttrs", !0)
				}
				return s
			}
			return "object" == typeof e ? this.each(function() {
				ue.data(this, e)
			}) : arguments.length > 1 ? this.each(function() {
				ue.data(this, e, n)
			}) : c ? o(c, e, ue.data(c, e)) : null
		},
		
		removeData: function(e) {
			return this.each(function() {
				ue.removeData(this, e)
			})
		}
	}), ue.extend({
		queue: function(e, n, i) {
			var r;
			return e ? (n = (n || "fx") + "queue", r = ue._data(e, n), i && (!r || ue.isArray(i) ? r = ue._data(e, n, ue.makeArray(i)) : r.push(i)), r || []) : t
		},
		
		dequeue: function(e, t) {
			t = t || "fx";
			var n = ue.queue(e, t),
				i = n.length,
				r = n.shift(),
				s = ue._queueHooks(e, t),
				o = function() {
					ue.dequeue(e, t)
				};
			"inprogress" === r && (r = n.shift(), i--), r && ("fx" === t && n.unshift("inprogress"), delete s.stop, r.call(e, o, s)), !i && s && s.empty.fire()
		},
		
		_queueHooks: function(e, t) {
			var n = t + "queueHooks";
			return ue._data(e, n) || ue._data(e, n, {
				empty: ue.Callbacks("once memory").add(function() {
					ue._removeData(e, t + "queue"), ue._removeData(e, n)
				})
			})
		}
	}), ue.fn.extend({
		queue: function(e, n) {
			var i = 2;
			return "string" != typeof e && (n = e, e = "fx", i--), i > arguments.length ? ue.queue(this[0], e) : n === t ? this : this.each(function() {
				var t = ue.queue(this, e, n);
				ue._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && ue.dequeue(this, e)
			})
		},
		
		dequeue: function(e) {
			return this.each(function() {
				ue.dequeue(this, e)
			})
		},
		
		delay: function(e, t) {
			return e = ue.fx ? ue.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
				var i = setTimeout(t, e);
				n.stop = function() {
					clearTimeout(i)
				}
			})
		},
		
		clearQueue: function(e) {
			return this.queue(e || "fx", [])
		},
		
		promise: function(e, n) {
			var i, r = 1,
				s = ue.Deferred(),
				o = this,
				a = this.length,
				c = function() {
					--r || s.resolveWith(o, [o])
				};
			
			for ("string" != typeof e && (n = e, e = t), e = e || "fx"; a--;) i = ue._data(o[a], e + "queueHooks"), i && i.empty && (r++, i.empty.add(c));
			return c(), s.promise(n)
		}
	});
	
	var Te, Oe, Se = /[\t\r\n\f]/g,
		Ee = /\r/g,
		Ae = /^(?:input|select|textarea|button|object)$/i,
		De = /^(?:a|area)$/i,
		Ue = /^(?:checked|selected)$/i,
		Re = ue.support.getSetAttribute,
		Fe = ue.support.input;
	ue.fn.extend({
		attr: function(e, t) {
			return ue.access(this, ue.attr, e, t, arguments.length > 1)
		},
		
		removeAttr: function(e) {
			return this.each(function() {
				ue.removeAttr(this, e)
			})
		},
		
		prop: function(e, t) {
			return ue.access(this, ue.prop, e, t, arguments.length > 1)
		},
		
		removeProp: function(e) {
			return e = ue.propFix[e] || e, this.each(function() {
				try {
					this[e] = t, delete this[e]
				} catch (n) {}
			})
		},
		
		addClass: function(e) {
			var t, n, i, r, s, o = 0,
				a = this.length,
				c = "string" == typeof e && e;
			if (ue.isFunction(e)) return this.each(function(t) {
				ue(this).addClass(e.call(this, t, this.className))
			});
			
			if (c) for (t = (e || "").match(pe) || []; a > o; o++) if (n = this[o], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Se, " ") : " ")) {
				for (s = 0; r = t[s++];) 0 > i.indexOf(" " + r + " ") && (i += r + " ");
				n.className = ue.trim(i)
			}
			return this
		},
		
		removeClass: function(e) {
			var t, n, i, r, s, o = 0,
				a = this.length,
				c = 0 === arguments.length || "string" == typeof e && e;
			if (ue.isFunction(e)) return this.each(function(t) {
				ue(this).removeClass(e.call(this, t, this.className))
			});
			
			if (c) for (t = (e || "").match(pe) || []; a > o; o++) if (n = this[o], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Se, " ") : "")) {
				for (s = 0; r = t[s++];) for (; i.indexOf(" " + r + " ") >= 0;) i = i.replace(" " + r + " ", " ");
				n.className = e ? ue.trim(i) : ""
			}
			return this
		},
		
		toggleClass: function(e, t) {
			var n = typeof e;
			return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : ue.isFunction(e) ? this.each(function(n) {
				ue(this).toggleClass(e.call(this, n, this.className, t), t)
			}) : this.each(function() {
				if ("string" === n) for (var t, i = 0, r = ue(this), s = e.match(pe) || []; t = s[i++];) r.hasClass(t) ? r.removeClass(t) : r.addClass(t);
				else(n === G || "boolean" === n) && (this.className && ue._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : ue._data(this, "__className__") || "")
			})
		},
		
		hasClass: function(e) {
			for (var t = " " + e + " ", n = 0, i = this.length; i > n; n++) if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(Se, " ").indexOf(t) >= 0) return !0;
			return !1
		},
		
		val: function(e) {
			var n, i, r, s = this[0];
			return arguments.length ? (r = ue.isFunction(e), this.each(function(n) {
				var s;
				1 === this.nodeType && (s = r ? e.call(this, n, ue(this).val()) : e, null == s ? s = "" : "number" == typeof s ? s += "" : ue.isArray(s) && (s = ue.map(s, function(e) {
					return null == e ? "" : e + ""
				})), i = ue.valHooks[this.type] || ue.valHooks[this.nodeName.toLowerCase()], i && "set" in i && i.set(this, s, "value") !== t || (this.value = s))
			})) : s ? (i = ue.valHooks[s.type] || ue.valHooks[s.nodeName.toLowerCase()], i && "get" in i && (n = i.get(s, "value")) !== t ? n : (n = s.value, "string" == typeof n ? n.replace(Ee, "") : null == n ? "" : n)) : void 0
		}
	}), ue.extend({
		valHooks: {
			option: {
				get: function(e) {
					var t = ue.find.attr(e, "value");
					return null != t ? t : e.text
				}
			},
			
			select: {
				get: function(e) {
					for (var t, n, i = e.options, r = e.selectedIndex, s = "select-one" === e.type || 0 > r, o = s ? null : [], a = s ? r + 1 : i.length, c = 0 > r ? a : s ? r : 0; a > c; c++) if (n = i[c], !(!n.selected && c !== r || (ue.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && ue.nodeName(n.parentNode, "optgroup"))) {
						if (t = ue(n).val(), s) return t;
						o.push(t)
					}
					return o
				},
				
				set: function(e, t) {
					for (var n, i, r = e.options, s = ue.makeArray(t), o = r.length; o--;) i = r[o], (i.selected = ue.inArray(ue(i).val(), s) >= 0) && (n = !0);
					return n || (e.selectedIndex = -1), s
				}
			}
		},
		
		attr: function(e, n, i) {
			var r, s, o = e.nodeType;
			if (e && 3 !== o && 8 !== o && 2 !== o) return typeof e.getAttribute === G ? ue.prop(e, n, i) : (1 === o && ue.isXMLDoc(e) || (n = n.toLowerCase(), r = ue.attrHooks[n] || (ue.expr.match.bool.test(n) ? Oe : Te)), i === t ? r && "get" in r && null !== (s = r.get(e, n)) ? s : (s = ue.find.attr(e, n), null == s ? t : s) : null !== i ? r && "set" in r && (s = r.set(e, i, n)) !== t ? s : (e.setAttribute(n, i + ""), i) : (ue.removeAttr(e, n), t))
		},
		
		removeAttr: function(e, t) {
			var n, i, r = 0,
				s = t && t.match(pe);
			if (s && 1 === e.nodeType) for (; n = s[r++];) i = ue.propFix[n] || n, ue.expr.match.bool.test(n) ? Fe && Re || !Ue.test(n) ? e[i] = !1 : e[ue.camelCase("default-" + n)] = e[i] = !1 : ue.attr(e, n, ""), e.removeAttribute(Re ? n : i)
		},
		
		attrHooks: {
			type: {
				set: function(e, t) {
					if (!ue.support.radioValue && "radio" === t && ue.nodeName(e, "input")) {
						var n = e.value;
						return e.setAttribute("type", t), n && (e.value = n), t
					}
				}
			}
		},
		
		propFix: {
			"for": "htmlFor",
			"class": "className"
		},
		
		prop: function(e, n, i) {
			var r, s, o, a = e.nodeType;
			if (e && 3 !== a && 8 !== a && 2 !== a) return o = 1 !== a || !ue.isXMLDoc(e), o && (n = ue.propFix[n] || n, s = ue.propHooks[n]), i !== t ? s && "set" in s && (r = s.set(e, i, n)) !== t ? r : e[n] = i : s && "get" in s && null !== (r = s.get(e, n)) ? r : e[n]
		},
		
		propHooks: {
			tabIndex: {
				get: function(e) {
					var t = ue.find.attr(e, "tabindex");
					return t ? parseInt(t, 10) : Ae.test(e.nodeName) || De.test(e.nodeName) && e.href ? 0 : -1
				}
			}
		}
	}), Oe = {
		set: function(e, t, n) {
			return t === !1 ? ue.removeAttr(e, n) : Fe && Re || !Ue.test(n) ? e.setAttribute(!Re && ue.propFix[n] || n, n) : e[ue.camelCase("default-" + n)] = e[n] = !0, n
		}
	}, ue.each(ue.expr.match.bool.source.match(/\w+/g), function(e, n) {
		var i = ue.expr.attrHandle[n] || ue.find.attr;
		ue.expr.attrHandle[n] = Fe && Re || !Ue.test(n) ?
		function(e, n, r) {
			var s = ue.expr.attrHandle[n],
				o = r ? t : (ue.expr.attrHandle[n] = t) != i(e, n, r) ? n.toLowerCase() : null;
			return ue.expr.attrHandle[n] = s, o
		} : function(e, n, i) {
			return i ? t : e[ue.camelCase("default-" + n)] ? n.toLowerCase() : null
		}
	}), Fe && Re || (ue.attrHooks.value = {
		set: function(e, n, i) {
			return ue.nodeName(e, "input") ? (e.defaultValue = n, t) : Te && Te.set(e, n, i)
		}
	}), Re || (Te = {
		set: function(e, n, i) {
			var r = e.getAttributeNode(i);
			return r || e.setAttributeNode(r = e.ownerDocument.createAttribute(i)), r.value = n += "", "value" === i || n === e.getAttribute(i) ? n : t
		}
	}, ue.expr.attrHandle.id = ue.expr.attrHandle.name = ue.expr.attrHandle.coords = function(e, n, i) {
		var r;
		return i ? t : (r = e.getAttributeNode(n)) && "" !== r.value ? r.value : null
	}, ue.valHooks.button = {
		get: function(e, n) {
			var i = e.getAttributeNode(n);
			return i && i.specified ? i.value : t
		},
		
		set: Te.set
	}, ue.attrHooks.contenteditable = {
		set: function(e, t, n) {
			Te.set(e, "" !== t && t, n)
		}
	}, ue.each(["width", "height"], function(e, n) {
		ue.attrHooks[n] = {
			set: function(e, i) {
				return "" === i ? (e.setAttribute(n, "auto"), i) : t
			}
		}
	})), ue.support.hrefNormalized || ue.each(["href", "src"], function(e, t) {
		ue.propHooks[t] = {
			get: function(e) {
				return e.getAttribute(t, 4)
			}
		}
	}), ue.support.style || (ue.attrHooks.style = {
		get: function(e) {
			return e.style.cssText || t
		},
		
		set: function(e, t) {
			return e.style.cssText = t + ""
		}
	}), ue.support.optSelected || (ue.propHooks.selected = {
		get: function(e) {
			var t = e.parentNode;
			return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
		}
	}), ue.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
		ue.propFix[this.toLowerCase()] = this
	}), ue.support.enctype || (ue.propFix.enctype = "encoding"), ue.each(["radio", "checkbox"], function() {
		ue.valHooks[this] = {
			set: function(e, n) {
				return ue.isArray(n) ? e.checked = ue.inArray(ue(e).val(), n) >= 0 : t
			}
		}, ue.support.checkOn || (ue.valHooks[this].get = function(e) {
			return null === e.getAttribute("value") ? "on" : e.value
		})
	});
	
	var Pe = /^(?:input|select|textarea)$/i,
		Me = /^key/,
		Ie = /^(?:mouse|contextmenu)|click/,
		ze = /^(?:focusinfocus|focusoutblur)$/,
		Le = /^([^.]*)(?:\.(.+)|)$/;
	ue.event = {
		global: {},
		
		add: function(e, n, i, r, s) {
			var o, a, c, l, u, d, p, f, h, m, g, _ = ue._data(e);
			if (_) {
				for (i.handler && (l = i, i = l.handler, s = l.selector), i.guid || (i.guid = ue.guid++), (a = _.events) || (a = _.events = {}), (d = _.handle) || (d = _.handle = function(e) {
					return typeof ue === G || e && ue.event.triggered === e.type ? t : ue.event.dispatch.apply(d.elem, arguments)
				}, d.elem = e), n = (n || "").match(pe) || [""], c = n.length; c--;) o = Le.exec(n[c]) || [], h = g = o[1], m = (o[2] || "").split(".").sort(), h && (u = ue.event.special[h] || {}, h = (s ? u.delegateType : u.bindType) || h, u = ue.event.special[h] || {}, p = ue.extend({
					type: h,
					origType: g,
					data: r,
					handler: i,
					guid: i.guid,
					selector: s,
					needsContext: s && ue.expr.match.needsContext.test(s),
					namespace: m.join(".")
				}, l), (f = a[h]) || (f = a[h] = [], f.delegateCount = 0, u.setup && u.setup.call(e, r, m, d) !== !1 || (e.addEventListener ? e.addEventListener(h, d, !1) : e.attachEvent && e.attachEvent("on" + h, d))), u.add && (u.add.call(e, p), p.handler.guid || (p.handler.guid = i.guid)), s ? f.splice(f.delegateCount++, 0, p) : f.push(p), ue.event.global[h] = !0);
				e = null
			}
		},
		
		remove: function(e, t, n, i, r) {
			var s, o, a, c, l, u, d, p, f, h, m, g = ue.hasData(e) && ue._data(e);
			if (g && (u = g.events)) {
				for (t = (t || "").match(pe) || [""], l = t.length; l--;) if (a = Le.exec(t[l]) || [], f = m = a[1], h = (a[2] || "").split(".").sort(), f) {
					for (d = ue.event.special[f] || {}, f = (i ? d.delegateType : d.bindType) || f, p = u[f] || [], a = a[2] && RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), c = s = p.length; s--;) o = p[s], !r && m !== o.origType || n && n.guid !== o.guid || a && !a.test(o.namespace) || i && i !== o.selector && ("**" !== i || !o.selector) || (p.splice(s, 1), o.selector && p.delegateCount--, d.remove && d.remove.call(e, o));
					c && !p.length && (d.teardown && d.teardown.call(e, h, g.handle) !== !1 || ue.removeEvent(e, f, g.handle), delete u[f])
				} else
				for (f in u) ue.event.remove(e, f + t[l], n, i, !0);
				ue.isEmptyObject(u) && (delete g.handle, ue._removeData(e, "events"))
			}
		},
		
		trigger: function(n, i, r, s) {
			var o, a, c, l, u, d, p, f = [r || X],
				h = ce.call(n, "type") ? n.type : n,
				m = ce.call(n, "namespace") ? n.namespace.split(".") : [];
			if (c = d = r = r || X, 3 !== r.nodeType && 8 !== r.nodeType && !ze.test(h + ue.event.triggered) && (h.indexOf(".") >= 0 && (m = h.split("."), h = m.shift(), m.sort()), a = 0 > h.indexOf(":") && "on" + h, n = n[ue.expando] ? n : new ue.Event(h, "object" == typeof n && n), n.isTrigger = s ? 2 : 3, n.namespace = m.join("."), n.namespace_re = n.namespace ? RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, n.result = t, n.target || (n.target = r), i = null == i ? [n] : ue.makeArray(i, [n]), u = ue.event.special[h] || {}, s || !u.trigger || u.trigger.apply(r, i) !== !1)) {
				if (!s && !u.noBubble && !ue.isWindow(r)) {
					for (l = u.delegateType || h, ze.test(l + h) || (c = c.parentNode); c; c = c.parentNode) f.push(c), d = c;
					d === (r.ownerDocument || X) && f.push(d.defaultView || d.parentWindow || e)
				}
				for (p = 0;
				(c = f[p++]) && !n.isPropagationStopped();) n.type = p > 1 ? l : u.bindType || h, o = (ue._data(c, "events") || {})[n.type] && ue._data(c, "handle"), o && o.apply(c, i), o = a && c[a], o && ue.acceptData(c) && o.apply && o.apply(c, i) === !1 && n.preventDefault();
				
				if (n.type = h, !s && !n.isDefaultPrevented() && (!u._default || u._default.apply(f.pop(), i) === !1) && ue.acceptData(r) && a && r[h] && !ue.isWindow(r)) {
					d = r[a], d && (r[a] = null), ue.event.triggered = h;
					try {
						r[h]()
					} catch (g) {}
					ue.event.triggered = t, d && (r[a] = d)
				}
				return n.result
			}
		},
		
		dispatch: function(e) {
			e = ue.event.fix(e);
			var n, i, r, s, o, a = [],
				c = se.call(arguments),
				l = (ue._data(this, "events") || {})[e.type] || [],
				u = ue.event.special[e.type] || {};
			
			if (c[0] = e, e.delegateTarget = this, !u.preDispatch || u.preDispatch.call(this, e) !== !1) {
				for (a = ue.event.handlers.call(this, e, l), n = 0;
				(s = a[n++]) && !e.isPropagationStopped();) for (e.currentTarget = s.elem, o = 0;
				(r = s.handlers[o++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(r.namespace)) && (e.handleObj = r, e.data = r.data, i = ((ue.event.special[r.origType] || {}).handle || r.handler).apply(s.elem, c), i !== t && (e.result = i) === !1 && (e.preventDefault(), e.stopPropagation()));
				return u.postDispatch && u.postDispatch.call(this, e), e.result
			}
		},
		
		handlers: function(e, n) {
			var i, r, s, o, a = [],
				c = n.delegateCount,
				l = e.target;
			if (c && l.nodeType && (!e.button || "click" !== e.type)) for (; l != this; l = l.parentNode || this) if (1 === l.nodeType && (l.disabled !== !0 || "click" !== e.type)) {
				for (s = [], o = 0; c > o; o++) r = n[o], i = r.selector + " ", s[i] === t && (s[i] = r.needsContext ? ue(i, this).index(l) >= 0 : ue.find(i, this, null, [l]).length), s[i] && s.push(r);
				s.length && a.push({
					elem: l,
					handlers: s
				})
			}
			return n.length > c && a.push({
				elem: this,
				handlers: n.slice(c)
			}), a
		},
		
		fix: function(e) {
			if (e[ue.expando]) return e;
			var t, n, i, r = e.type,
				s = e,
				o = this.fixHooks[r];
			for (o || (this.fixHooks[r] = o = Ie.test(r) ? this.mouseHooks : Me.test(r) ? this.keyHooks : {}), i = o.props ? this.props.concat(o.props) : this.props, e = new ue.Event(s), t = i.length; t--;) n = i[t], e[n] = s[n];
			return e.target || (e.target = s.srcElement || X), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !! e.metaKey, o.filter ? o.filter(e, s) : e
		},
		
		props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
		fixHooks: {},
		
		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function(e, t) {
				return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
			}
		},
		
		mouseHooks: {
			props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function(e, n) {
				var i, r, s, o = n.button,
					a = n.fromElement;
				return null == e.pageX && null != n.clientX && (r = e.target.ownerDocument || X, s = r.documentElement, i = r.body, e.pageX = n.clientX + (s && s.scrollLeft || i && i.scrollLeft || 0) - (s && s.clientLeft || i && i.clientLeft || 0), e.pageY = n.clientY + (s && s.scrollTop || i && i.scrollTop || 0) - (s && s.clientTop || i && i.clientTop || 0)), !e.relatedTarget && a && (e.relatedTarget = a === e.target ? n.toElement : a), e.which || o === t || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), e
			}
		},
		
		special: {
			load: {
				noBubble: !0
			},
			
			focus: {
				trigger: function() {
					if (this !== u() && this.focus) try {
						return this.focus(), !1
					} catch (e) {}
				},
				
				delegateType: "focusin"
			},
			
			blur: {
				trigger: function() {
					return this === u() && this.blur ? (this.blur(), !1) : t
				},
				
				delegateType: "focusout"
			},
			
			click: {
				trigger: function() {
					return ue.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : t
				},
				
				_default: function(e) {
					return ue.nodeName(e.target, "a")
				}
			},
			
			beforeunload: {
				postDispatch: function(e) {
					e.result !== t && (e.originalEvent.returnValue = e.result)
				}
			}
		},
		
		simulate: function(e, t, n, i) {
			var r = ue.extend(new ue.Event, n, {
				type: e,
				isSimulated: !0,
				originalEvent: {}
			});
			
			i ? ue.event.trigger(r, null, t) : ue.event.dispatch.call(t, r), r.isDefaultPrevented() && n.preventDefault()
		}
	}, ue.removeEvent = X.removeEventListener ?
	function(e, t, n) {
		e.removeEventListener && e.removeEventListener(t, n, !1)
	} : function(e, t, n) {
		var i = "on" + t;
		e.detachEvent && (typeof e[i] === G && (e[i] = null), e.detachEvent(i, n))
	}, ue.Event = function(e, n) {
		return this instanceof ue.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? c : l) : this.type = e, n && ue.extend(this, n), this.timeStamp = e && e.timeStamp || ue.now(), this[ue.expando] = !0, t) : new ue.Event(e, n)
	}, ue.Event.prototype = {
		isDefaultPrevented: l,
		isPropagationStopped: l,
		isImmediatePropagationStopped: l,
		preventDefault: function() {
			var e = this.originalEvent;
			this.isDefaultPrevented = c, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
		},
		
		stopPropagation: function() {
			var e = this.originalEvent;
			this.isPropagationStopped = c, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
		},
		
		stopImmediatePropagation: function() {
			this.isImmediatePropagationStopped = c, this.stopPropagation()
		}
	}, ue.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout"
	}, function(e, t) {
		ue.event.special[e] = {
			delegateType: t,
			bindType: t,
			handle: function(e) {
				var n, i = this,
					r = e.relatedTarget,
					s = e.handleObj;
				return (!r || r !== i && !ue.contains(i, r)) && (e.type = s.origType, n = s.handler.apply(this, arguments), e.type = t), n
			}
		}
	}), ue.support.submitBubbles || (ue.event.special.submit = {
		setup: function() {
			return !ue.nodeName(this, "form") && (ue.event.add(this, "click._submit keypress._submit", function(e) {
				var n = e.target,
					i = ue.nodeName(n, "input") || ue.nodeName(n, "button") ? n.form : t;
				i && !ue._data(i, "submitBubbles") && (ue.event.add(i, "submit._submit", function(e) {
					e._submit_bubble = !0
				}), ue._data(i, "submitBubbles", !0))
			}), t)
		},
		
		postDispatch: function(e) {
			e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && ue.event.simulate("submit", this.parentNode, e, !0))
		},
		
		teardown: function() {
			return !ue.nodeName(this, "form") && (ue.event.remove(this, "._submit"), t)
		}
	}), ue.support.changeBubbles || (ue.event.special.change = {
		setup: function() {
			return Pe.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (ue.event.add(this, "propertychange._change", function(e) {
				"checked" === e.originalEvent.propertyName && (this._just_changed = !0)
			}), ue.event.add(this, "click._change", function(e) {
				this._just_changed && !e.isTrigger && (this._just_changed = !1), ue.event.simulate("change", this, e, !0)
			})), !1) : (ue.event.add(this, "beforeactivate._change", function(e) {
				var t = e.target;
				Pe.test(t.nodeName) && !ue._data(t, "changeBubbles") && (ue.event.add(t, "change._change", function(e) {
					!this.parentNode || e.isSimulated || e.isTrigger || ue.event.simulate("change", this.parentNode, e, !0)
				}), ue._data(t, "changeBubbles", !0))
			}), t)
		},
		
		handle: function(e) {
			var n = e.target;
			return this !== n || e.isSimulated || e.isTrigger || "radio" !== n.type && "checkbox" !== n.type ? e.handleObj.handler.apply(this, arguments) : t
		},
		
		teardown: function() {
			return ue.event.remove(this, "._change"), !Pe.test(this.nodeName)
		}
	}), ue.support.focusinBubbles || ue.each({
		focus: "focusin",
		blur: "focusout"
	}, function(e, t) {
		var n = 0,
			i = function(e) {
				ue.event.simulate(t, e.target, ue.event.fix(e), !0)
			};
		
		ue.event.special[t] = {
			setup: function() {
				0 === n++ && X.addEventListener(e, i, !0)
			},
			
			teardown: function() {
				0 === --n && X.removeEventListener(e, i, !0)
			}
		}
	}), ue.fn.extend({
		on: function(e, n, i, r, s) {
			var o, a;
			if ("object" == typeof e) {
				"string" != typeof n && (i = i || n, n = t);
				for (o in e) this.on(o, n, i, e[o], s);
				return this
			}
			if (null == i && null == r ? (r = n, i = n = t) : null == r && ("string" == typeof n ? (r = i, i = t) : (r = i, i = n, n = t)), r === !1) r = l;
			else if (!r) return this;
			return 1 === s && (a = r, r = function(e) {
				return ue().off(e), a.apply(this, arguments)
			}, r.guid = a.guid || (a.guid = ue.guid++)), this.each(function() {
				ue.event.add(this, e, r, i, n)
			})
		},
		
		one: function(e, t, n, i) {
			return this.on(e, t, n, i, 1)
		},
		
		off: function(e, n, i) {
			var r, s;
			if (e && e.preventDefault && e.handleObj) return r = e.handleObj, ue(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
			if ("object" == typeof e) {
				for (s in e) this.off(s, n, e[s]);
				return this
			}
			return (n === !1 || "function" == typeof n) && (i = n, n = t), i === !1 && (i = l), this.each(function() {
				ue.event.remove(this, e, i, n)
			})
		},
		
		trigger: function(e, t) {
			return this.each(function() {
				ue.event.trigger(e, t, this)
			})
		},
		
		triggerHandler: function(e, n) {
			var i = this[0];
			return i ? ue.event.trigger(e, n, i, !0) : t
		}
	});
	
	var Be = /^.[^:#\[\.,]*$/,
		Je = /^(?:parents|prev(?:Until|All))/,
		Ve = ue.expr.match.needsContext,
		He = {
			children: !0,
			contents: !0,
			next: !0,
			prev: !0
		};
	
	ue.fn.extend({
		find: function(e) {
			var t, n = [],
				i = this,
				r = i.length;
			if ("string" != typeof e) return this.pushStack(ue(e).filter(function() {
				for (t = 0; r > t; t++) if (ue.contains(i[t], this)) return !0
			}));
			for (t = 0; r > t; t++) ue.find(e, i[t], n);
			return n = this.pushStack(r > 1 ? ue.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
		},
		
		has: function(e) {
			var t, n = ue(e, this),
				i = n.length;
			return this.filter(function() {
				for (t = 0; i > t; t++) if (ue.contains(this, n[t])) return !0
			})
		},
		
		not: function(e) {
			return this.pushStack(p(this, e || [], !0))
		},
		
		filter: function(e) {
			return this.pushStack(p(this, e || [], !1))
		},
		
		is: function(e) {
			return !!p(this, "string" == typeof e && Ve.test(e) ? ue(e) : e || [], !1).length
		},
		
		closest: function(e, t) {
			for (var n, i = 0, r = this.length, s = [], o = Ve.test(e) || "string" != typeof e ? ue(e, t || this.context) : 0; r > i; i++) for (n = this[i]; n && n !== t; n = n.parentNode) if (11 > n.nodeType && (o ? o.index(n) > -1 : 1 === n.nodeType && ue.find.matchesSelector(n, e))) {
				n = s.push(n);
				break
			}
			return this.pushStack(s.length > 1 ? ue.unique(s) : s)
		},
		
		index: function(e) {
			return e ? "string" == typeof e ? ue.inArray(this[0], ue(e)) : ue.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
		},
		
		add: function(e, t) {
			var n = "string" == typeof e ? ue(e, t) : ue.makeArray(e && e.nodeType ? [e] : e),
				i = ue.merge(this.get(), n);
			return this.pushStack(ue.unique(i))
		},
		
		addBack: function(e) {
			return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
		}
	}), ue.each({
		parent: function(e) {
			var t = e.parentNode;
			return t && 11 !== t.nodeType ? t : null
		},
		
		parents: function(e) {
			return ue.dir(e, "parentNode")
		},
		
		parentsUntil: function(e, t, n) {
			return ue.dir(e, "parentNode", n)
		},
		
		next: function(e) {
			return d(e, "nextSibling")
		},
		
		prev: function(e) {
			return d(e, "previousSibling")
		},
		
		nextAll: function(e) {
			return ue.dir(e, "nextSibling")
		},
		
		prevAll: function(e) {
			return ue.dir(e, "previousSibling")
		},
		
		nextUntil: function(e, t, n) {
			return ue.dir(e, "nextSibling", n)
		},
		
		prevUntil: function(e, t, n) {
			return ue.dir(e, "previousSibling", n)
		},
		
		siblings: function(e) {
			return ue.sibling((e.parentNode || {}).firstChild, e)
		},
		
		children: function(e) {
			return ue.sibling(e.firstChild)
		},
		
		contents: function(e) {
			return ue.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : ue.merge([], e.childNodes)
		}
	}, function(e, t) {
		ue.fn[e] = function(n, i) {
			var r = ue.map(this, t, n);
			return "Until" !== e.slice(-5) && (i = n), i && "string" == typeof i && (r = ue.filter(i, r)), this.length > 1 && (He[e] || (r = ue.unique(r)), Je.test(e) && (r = r.reverse())), this.pushStack(r)
		}
	}), ue.extend({
		filter: function(e, t, n) {
			var i = t[0];
			return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? ue.find.matchesSelector(i, e) ? [i] : [] : ue.find.matches(e, ue.grep(t, function(e) {
				return 1 === e.nodeType
			}))
		},
		
		dir: function(e, n, i) {
			for (var r = [], s = e[n]; s && 9 !== s.nodeType && (i === t || 1 !== s.nodeType || !ue(s).is(i));) 1 === s.nodeType && r.push(s), s = s[n];
			return r
		},
		
		sibling: function(e, t) {
			for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
			return n
		}
	});
	
	var qe = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
		We = / jQuery\d+="(?:null|\d+)"/g,
		Ge = RegExp("<(?:" + qe + ")[\\s/>]", "i"),
		Ye = /^\s+/,
		Xe = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		Ke = /<([\w:]+)/,
		Ze = /<tbody/i,
		Qe = /<|&#?\w+;/,
		et = /<(?:script|style|link)/i,
		tt = /^(?:checkbox|radio)$/i,
		nt = /checked\s*(?:[^=]|=\s*.checked.)/i,
		it = /^$|\/(?:java|ecma)script/i,
		rt = /^true\/(.*)/,
		st = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
		ot = {
			option: [1, "<select multiple='multiple'>", "</select>"],
			legend: [1, "<fieldset>", "</fieldset>"],
			area: [1, "<map>", "</map>"],
			param: [1, "<object>", "</object>"],
			thead: [1, "<table>", "</table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			_default: ue.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
		},
		at = f(X),
		ct = at.appendChild(X.createElement("div"));
	ot.optgroup = ot.option, ot.tbody = ot.tfoot = ot.colgroup = ot.caption = ot.thead, ot.th = ot.td, ue.fn.extend({
		text: function(e) {
			return ue.access(this, function(e) {
				return e === t ? ue.text(this) : this.empty().append((this[0] && this[0].ownerDocument || X).createTextNode(e))
			}, null, e, arguments.length)
		},
		
		append: function() {
			return this.domManip(arguments, function(e) {
				if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
					var t = h(this, e);
					t.appendChild(e)
				}
			})
		},
		
		prepend: function() {
			return this.domManip(arguments, function(e) {
				if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
					var t = h(this, e);
					t.insertBefore(e, t.firstChild)
				}
			})
		},
		
		before: function() {
			return this.domManip(arguments, function(e) {
				this.parentNode && this.parentNode.insertBefore(e, this)
			})
		},
		
		after: function() {
			return this.domManip(arguments, function(e) {
				this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
			})
		},
		
		remove: function(e, t) {
			for (var n, i = e ? ue.filter(e, this) : this, r = 0; null != (n = i[r]); r++) t || 1 !== n.nodeType || ue.cleanData(b(n)), n.parentNode && (t && ue.contains(n.ownerDocument, n) && _(b(n, "script")), n.parentNode.removeChild(n));
			return this
		},
		
		empty: function() {
			for (var e, t = 0; null != (e = this[t]); t++) {
				for (1 === e.nodeType && ue.cleanData(b(e, !1)); e.firstChild;) e.removeChild(e.firstChild);
				e.options && ue.nodeName(e, "select") && (e.options.length = 0)
			}
			return this
		},
		
		clone: function(e, t) {
			return e = null != e && e, t = null == t ? e : t, this.map(function() {
				return ue.clone(this, e, t)
			})
		},
		
		html: function(e) {
			return ue.access(this, function(e) {
				var n = this[0] || {},
					i = 0,
					r = this.length;
				if (e === t) return 1 === n.nodeType ? n.innerHTML.replace(We, "") : t;
				if (!("string" != typeof e || et.test(e) || !ue.support.htmlSerialize && Ge.test(e) || !ue.support.leadingWhitespace && Ye.test(e) || ot[(Ke.exec(e) || ["", ""])[1].toLowerCase()])) {
					e = e.replace(Xe, "<$1></$2>");
					try {
						for (; r > i; i++) n = this[i] || {}, 1 === n.nodeType && (ue.cleanData(b(n, !1)), n.innerHTML = e);
						n = 0
					} catch (s) {}
				}
				n && this.empty().append(e)
			}, null, e, arguments.length)
		},
		
		replaceWith: function() {
			var e = ue.map(this, function(e) {
				return [e.nextSibling, e.parentNode]
			}),
				t = 0;
			return this.domManip(arguments, function(n) {
				var i = e[t++],
					r = e[t++];
				r && (i && i.parentNode !== r && (i = this.nextSibling), ue(this).remove(), r.insertBefore(n, i))
			}, !0), t ? this : this.remove()
		},
		
		detach: function(e) {
			return this.remove(e, !0)
		},
		
		domManip: function(e, t, n) {
			e = ie.apply([], e);
			var i, r, s, o, a, c, l = 0,
				u = this.length,
				d = this,
				p = u - 1,
				f = e[0],
				h = ue.isFunction(f);
			if (h || !(1 >= u || "string" != typeof f || ue.support.checkClone) && nt.test(f)) return this.each(function(i) {
				var r = d.eq(i);
				h && (e[0] = f.call(this, i, r.html())), r.domManip(e, t, n)
			});
			
			if (u && (c = ue.buildFragment(e, this[0].ownerDocument, !1, !n && this), i = c.firstChild, 1 === c.childNodes.length && (c = i), i)) {
				for (o = ue.map(b(c, "script"), m), s = o.length; u > l; l++) r = c, l !== p && (r = ue.clone(r, !0, !0), s && ue.merge(o, b(r, "script"))), t.call(this[l], r, l);
				if (s) for (a = o[o.length - 1].ownerDocument, ue.map(o, g), l = 0; s > l; l++) r = o[l], it.test(r.type || "") && !ue._data(r, "globalEval") && ue.contains(a, r) && (r.src ? ue._evalUrl(r.src) : ue.globalEval((r.text || r.textContent || r.innerHTML || "").replace(st, "")));
				c = i = null
			}
			return this
		}
	}), ue.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function(e, t) {
		ue.fn[e] = function(e) {
			for (var n, i = 0, r = [], s = ue(e), o = s.length - 1; o >= i; i++) n = i === o ? this : this.clone(!0), ue(s[i])[t](n), re.apply(r, n.get());
			return this.pushStack(r)
		}
	}), ue.extend({
		clone: function(e, t, n) {
			var i, r, s, o, a, c = ue.contains(e.ownerDocument, e);
			if (ue.support.html5Clone || ue.isXMLDoc(e) || !Ge.test("<" + e.nodeName + ">") ? s = e.cloneNode(!0) : (ct.innerHTML = e.outerHTML, ct.removeChild(s = ct.firstChild)), !(ue.support.noCloneEvent && ue.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || ue.isXMLDoc(e))) for (i = b(s), a = b(e), o = 0; null != (r = a[o]); ++o) i[o] && y(r, i[o]);
			if (t) if (n) for (a = a || b(e), i = i || b(s), o = 0; null != (r = a[o]); o++) v(r, i[o]);
			else v(e, s);
			return i = b(s, "script"), i.length > 0 && _(i, !c && b(e, "script")), i = a = r = null, s
		},
		
		buildFragment: function(e, t, n, i) {
			for (var r, s, o, a, c, l, u, d = e.length, p = f(t), h = [], m = 0; d > m; m++) if (s = e[m], s || 0 === s) if ("object" === ue.type(s)) ue.merge(h, s.nodeType ? [s] : s);
			else if (Qe.test(s)) {
				for (a = a || p.appendChild(t.createElement("div")), c = (Ke.exec(s) || ["", ""])[1].toLowerCase(), u = ot[c] || ot._default, a.innerHTML = u[1] + s.replace(Xe, "<$1></$2>") + u[2], r = u[0]; r--;) a = a.lastChild;
				if (!ue.support.leadingWhitespace && Ye.test(s) && h.push(t.createTextNode(Ye.exec(s)[0])), !ue.support.tbody) for (s = "table" !== c || Ze.test(s) ? "<table>" !== u[1] || Ze.test(s) ? 0 : a : a.firstChild, r = s && s.childNodes.length; r--;) ue.nodeName(l = s.childNodes[r], "tbody") && !l.childNodes.length && s.removeChild(l);
				for (ue.merge(h, a.childNodes), a.textContent = ""; a.firstChild;) a.removeChild(a.firstChild);
				a = p.lastChild
			} else h.push(t.createTextNode(s));
			for (a && p.removeChild(a), ue.support.appendChecked || ue.grep(b(h, "input"), $), m = 0; s = h[m++];) if ((!i || -1 === ue.inArray(s, i)) && (o = ue.contains(s.ownerDocument, s), a = b(p.appendChild(s), "script"), o && _(a), n)) for (r = 0; s = a[r++];) it.test(s.type || "") && n.push(s);
			return a = null, p
		},
		
		cleanData: function(e, t) {
			for (var n, i, r, s, o = 0, a = ue.expando, c = ue.cache, l = ue.support.deleteExpando, u = ue.event.special; null != (n = e[o]); o++) if ((t || ue.acceptData(n)) && (r = n[a], s = r && c[r])) {
				if (s.events) for (i in s.events) u[i] ? ue.event.remove(n, i) : ue.removeEvent(n, i, s.handle);
				c[r] && (delete c[r], l ? delete n[a] : typeof n.removeAttribute !== G ? n.removeAttribute(a) : n[a] = null, te.push(r))
			}
		},
		
		_evalUrl: function(e) {
			return ue.ajax({
				url: e,
				type: "GET",
				dataType: "script",
				async: !1,
				global: !1,
				"throws": !0
			})
		}
	}), ue.fn.extend({
		wrapAll: function(e) {
			if (ue.isFunction(e)) return this.each(function(t) {
				ue(this).wrapAll(e.call(this, t))
			});
			
			if (this[0]) {
				var t = ue(e, this[0].ownerDocument).eq(0).clone(!0);
				this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
					for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
					return e
				}).append(this)
			}
			return this
		},
		
		wrapInner: function(e) {
			return ue.isFunction(e) ? this.each(function(t) {
				ue(this).wrapInner(e.call(this, t))
			}) : this.each(function() {
				var t = ue(this),
					n = t.contents();
				
				n.length ? n.wrapAll(e) : t.append(e)
			})
		},
		
		wrap: function(e) {
			var t = ue.isFunction(e);
			return this.each(function(n) {
				ue(this).wrapAll(t ? e.call(this, n) : e)
			})
		},
		
		unwrap: function() {
			return this.parent().each(function() {
				ue.nodeName(this, "body") || ue(this).replaceWith(this.childNodes)
			}).end()
		}
	});
	
	var lt, ut, dt, pt = /alpha\([^)]*\)/i,
		ft = /opacity\s*=\s*([^)]*)/,
		ht = /^(top|right|bottom|left)$/,
		mt = /^(none|table(?!-c[ea]).+)/,
		gt = /^margin/,
		_t = RegExp("^(" + de + ")(.*)$", "i"),
		vt = RegExp("^(" + de + ")(?!px)[a-z%]+$", "i"),
		yt = RegExp("^([+-])=(" + de + ")", "i"),
		bt = {
			BODY: "block"
		},
		$t = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		},
		wt = {
			letterSpacing: 0,
			fontWeight: 400
		},
		jt = ["Top", "Right", "Bottom", "Left"],
		xt = ["Webkit", "O", "Moz", "ms"];
	ue.fn.extend({
		css: function(e, n) {
			return ue.access(this, function(e, n, i) {
				var r, s, o = {},
					a = 0;
				if (ue.isArray(n)) {
					for (s = ut(e), r = n.length; r > a; a++) o[n[a]] = ue.css(e, n[a], !1, s);
					return o
				}
				return i !== t ? ue.style(e, n, i) : ue.css(e, n)
			}, e, n, arguments.length > 1)
		},
		
		show: function() {
			return x(this, !0)
		},
		
		hide: function() {
			return x(this)
		},
		
		toggle: function(e) {
			return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
				j(this) ? ue(this).show() : ue(this).hide()
			})
		}
	}), ue.extend({
		cssHooks: {
			opacity: {
				get: function(e, t) {
					if (t) {
						var n = dt(e, "opacity");
						return "" === n ? "1" : n
					}
				}
			}
		},
		
		cssNumber: {
			columnCount: !0,
			fillOpacity: !0,
			fontWeight: !0,
			lineHeight: !0,
			opacity: !0,
			order: !0,
			orphans: !0,
			widows: !0,
			zIndex: !0,
			zoom: !0
		},
		
		cssProps: {
			"float": ue.support.cssFloat ? "cssFloat" : "styleFloat"
		},
		
		style: function(e, n, i, r) {
			if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
				var s, o, a, c = ue.camelCase(n),
					l = e.style;
				if (n = ue.cssProps[c] || (ue.cssProps[c] = w(l, c)), a = ue.cssHooks[n] || ue.cssHooks[c], i === t) return a && "get" in a && (s = a.get(e, !1, r)) !== t ? s : l[n];
				if (o = typeof i, "string" === o && (s = yt.exec(i)) && (i = (s[1] + 1) * s[2] + parseFloat(ue.css(e, n)), o = "number"), !(null == i || "number" === o && isNaN(i) || ("number" !== o || ue.cssNumber[c] || (i += "px"), ue.support.clearCloneStyle || "" !== i || 0 !== n.indexOf("background") || (l[n] = "inherit"), a && "set" in a && (i = a.set(e, i, r)) === t))) try {
					l[n] = i
				} catch (u) {}
			}
		},
		
		css: function(e, n, i, r) {
			var s, o, a, c = ue.camelCase(n);
			return n = ue.cssProps[c] || (ue.cssProps[c] = w(e.style, c)), a = ue.cssHooks[n] || ue.cssHooks[c], a && "get" in a && (o = a.get(e, !0, i)), o === t && (o = dt(e, n, r)), "normal" === o && n in wt && (o = wt[n]), "" === i || i ? (s = parseFloat(o), i === !0 || ue.isNumeric(s) ? s || 0 : o) : o
		}
	}), e.getComputedStyle ? (ut = function(t) {
		return e.getComputedStyle(t, null)
	}, dt = function(e, n, i) {
		var r, s, o, a = i || ut(e),
			c = a ? a.getPropertyValue(n) || a[n] : t,
			l = e.style;
		return a && ("" !== c || ue.contains(e.ownerDocument, e) || (c = ue.style(e, n)), vt.test(c) && gt.test(n) && (r = l.width, s = l.minWidth, o = l.maxWidth, l.minWidth = l.maxWidth = l.width = c, c = a.width, l.width = r, l.minWidth = s, l.maxWidth = o)), c
	}) : X.documentElement.currentStyle && (ut = function(e) {
		return e.currentStyle
	}, dt = function(e, n, i) {
		var r, s, o, a = i || ut(e),
			c = a ? a[n] : t,
			l = e.style;
		return null == c && l && l[n] && (c = l[n]), vt.test(c) && !ht.test(n) && (r = l.left, s = e.runtimeStyle, o = s && s.left, o && (s.left = e.currentStyle.left), l.left = "fontSize" === n ? "1em" : c, c = l.pixelLeft + "px", l.left = r, o && (s.left = o)), "" === c ? "auto" : c
	}), ue.each(["height", "width"], function(e, n) {
		ue.cssHooks[n] = {
			get: function(e, i, r) {
				return i ? 0 === e.offsetWidth && mt.test(ue.css(e, "display")) ? ue.swap(e, $t, function() {
					return N(e, n, r)
				}) : N(e, n, r) : t
			},
			
			set: function(e, t, i) {
				var r = i && ut(e);
				return C(e, t, i ? k(e, n, i, ue.support.boxSizing && "border-box" === ue.css(e, "boxSizing", !1, r), r) : 0)
			}
		}
	}), ue.support.opacity || (ue.cssHooks.opacity = {
		get: function(e, t) {
			return ft.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
		},
		
		set: function(e, t) {
			var n = e.style,
				i = e.currentStyle,
				r = ue.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
				s = i && i.filter || n.filter || "";
			n.zoom = 1, (t >= 1 || "" === t) && "" === ue.trim(s.replace(pt, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || i && !i.filter) || (n.filter = pt.test(s) ? s.replace(pt, r) : s + " " + r)
		}
	}), ue(function() {
		ue.support.reliableMarginRight || (ue.cssHooks.marginRight = {
			get: function(e, n) {
				return n ? ue.swap(e, {
					display: "inline-block"
				}, dt, [e, "marginRight"]) : t
			}
		}), !ue.support.pixelPosition && ue.fn.position && ue.each(["top", "left"], function(e, n) {
			ue.cssHooks[n] = {
				get: function(e, i) {
					return i ? (i = dt(e, n), vt.test(i) ? ue(e).position()[n] + "px" : i) : t
				}
			}
		})
	}), ue.expr && ue.expr.filters && (ue.expr.filters.hidden = function(e) {
		return 0 >= e.offsetWidth && 0 >= e.offsetHeight || !ue.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || ue.css(e, "display"))
	}, ue.expr.filters.visible = function(e) {
		return !ue.expr.filters.hidden(e)
	}), ue.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function(e, t) {
		ue.cssHooks[e + t] = {
			expand: function(n) {
				for (var i = 0, r = {}, s = "string" == typeof n ? n.split(" ") : [n]; 4 > i; i++) r[e + jt[i] + t] = s[i] || s[i - 2] || s[0];
				return r
			}
		}, gt.test(e) || (ue.cssHooks[e + t].set = C)
	});
	
	var Ct = /%20/g,
		kt = /\[\]$/,
		Nt = /\r?\n/g,
		Tt = /^(?:submit|button|image|reset|file)$/i,
		Ot = /^(?:input|select|textarea|keygen)/i;
	ue.fn.extend({
		serialize: function() {
			return ue.param(this.serializeArray())
		},
		
		serializeArray: function() {
			return this.map(function() {
				var e = ue.prop(this, "elements");
				return e ? ue.makeArray(e) : this
			}).filter(function() {
				var e = this.type;
				return this.name && !ue(this).is(":disabled") && Ot.test(this.nodeName) && !Tt.test(e) && (this.checked || !tt.test(e))
			}).map(function(e, t) {
				var n = ue(this).val();
				
				return null == n ? null : ue.isArray(n) ? ue.map(n, function(e) {
					return {
						name: t.name,
						value: e.replace(Nt, "\r\n")
					}
				}) : {
					name: t.name,
					value: n.replace(Nt, "\r\n")
				}
			}).get()
		}
	}), ue.param = function(e, n) {
		var i, r = [],
			s = function(e, t) {
				t = ue.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
			};
		
		if (n === t && (n = ue.ajaxSettings && ue.ajaxSettings.traditional), ue.isArray(e) || e.jquery && !ue.isPlainObject(e)) ue.each(e, function() {
			s(this.name, this.value)
		});
		else
		for (i in e) S(i, e[i], n, s);
		return r.join("&").replace(Ct, "+")
	}, ue.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
		ue.fn[t] = function(e, n) {
			return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
		}
	}), ue.fn.extend({
		hover: function(e, t) {
			return this.mouseenter(e).mouseleave(t || e)
		},
		
		bind: function(e, t, n) {
			return this.on(e, null, t, n)
		},
		
		unbind: function(e, t) {
			return this.off(e, null, t)
		},
		
		delegate: function(e, t, n, i) {
			return this.on(t, e, n, i)
		},
		
		undelegate: function(e, t, n) {
			return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
		}
	});
	
	var St, Et, At = ue.now(),
		Dt = /\?/,
		Ut = /#.*$/,
		Rt = /([?&])_=[^&]*/,
		Ft = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
		Pt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		Mt = /^(?:GET|HEAD)$/,
		It = /^\/\//,
		zt = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
		Lt = ue.fn.load,
		Bt = {},
		Jt = {},
		Vt = "*/".concat("*");
	try {
		Et = Y.href
	} catch (Ht) {
		Et = X.createElement("a"), Et.href = "", Et = Et.href
	}
	St = zt.exec(Et.toLowerCase()) || [], ue.fn.load = function(e, n, i) {
		if ("string" != typeof e && Lt) return Lt.apply(this, arguments);
		var r, s, o, a = this,
			c = e.indexOf(" ");
		return c >= 0 && (r = e.slice(c, e.length), e = e.slice(0, c)), ue.isFunction(n) ? (i = n, n = t) : n && "object" == typeof n && (o = "POST"), a.length > 0 && ue.ajax({
			url: e,
			type: o,
			dataType: "html",
			data: n
		}).done(function(e) {
			s = arguments, a.html(r ? ue("<div>").append(ue.parseHTML(e)).find(r) : e)
		}).complete(i &&
		function(e, t) {
			a.each(i, s || [e.responseText, t, e])
		}), this
	}, ue.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
		ue.fn[t] = function(e) {
			return this.on(t, e)
		}
	}), ue.extend({
		active: 0,
		lastModified: {},
		
		etag: {},
		
		ajaxSettings: {
			url: Et,
			type: "GET",
			isLocal: Pt.test(St[1]),
			global: !0,
			processData: !0,
			async: !0,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			accepts: {
				"*": Vt,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
			
			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},
			
			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},
			
			converters: {
				"* text": String,
				"text html": !0,
				"text json": ue.parseJSON,
				"text xml": ue.parseXML
			},
			
			flatOptions: {
				url: !0,
				context: !0
			}
		},
		
		ajaxSetup: function(e, t) {
			return t ? D(D(e, ue.ajaxSettings), t) : D(ue.ajaxSettings, e)
		},
		
		ajaxPrefilter: E(Bt),
		ajaxTransport: E(Jt),
		ajax: function(e, n) {
			function i(e, n, i, r) {
				var s, d, v, y, $, j = n;
				2 !== b && (b = 2, c && clearTimeout(c), u = t, a = r || "", w.readyState = e > 0 ? 4 : 0, s = e >= 200 && 300 > e || 304 === e, i && (y = U(p, w, i)), y = R(p, y, w, s), s ? (p.ifModified && ($ = w.getResponseHeader("Last-Modified"), $ && (ue.lastModified[o] = $), $ = w.getResponseHeader("etag"), $ && (ue.etag[o] = $)), 204 === e || "HEAD" === p.type ? j = "nocontent" : 304 === e ? j = "notmodified" : (j = y.state, d = y.data, v = y.error, s = !v)) : (v = j, (e || !j) && (j = "error", 0 > e && (e = 0))), w.status = e, w.statusText = (n || j) + "", s ? m.resolveWith(f, [d, j, w]) : m.rejectWith(f, [w, j, v]), w.statusCode(_), _ = t, l && h.trigger(s ? "ajaxSuccess" : "ajaxError", [w, p, s ? d : v]), g.fireWith(f, [w, j]), l && (h.trigger("ajaxComplete", [w, p]), --ue.active || ue.event.trigger("ajaxStop")))
			}
			"object" == typeof e && (n = e, e = t), n = n || {};
			
			var r, s, o, a, c, l, u, d, p = ue.ajaxSetup({}, n),
				f = p.context || p,
				h = p.context && (f.nodeType || f.jquery) ? ue(f) : ue.event,
				m = ue.Deferred(),
				g = ue.Callbacks("once memory"),
				_ = p.statusCode || {},
				v = {},
				y = {},
				b = 0,
				$ = "canceled",
				w = {
					readyState: 0,
					getResponseHeader: function(e) {
						var t;
						if (2 === b) {
							if (!d) for (d = {}; t = Ft.exec(a);) d[t[1].toLowerCase()] = t[2];
							t = d[e.toLowerCase()]
						}
						return null == t ? null : t
					},
					
					getAllResponseHeaders: function() {
						return 2 === b ? a : null
					},
					
					setRequestHeader: function(e, t) {
						var n = e.toLowerCase();
						
						return b || (e = y[n] = y[n] || e, v[e] = t), this
					},
					
					overrideMimeType: function(e) {
						return b || (p.mimeType = e), this
					},
					
					statusCode: function(e) {
						var t;
						if (e) if (2 > b) for (t in e) _[t] = [_[t], e[t]];
						else w.always(e[w.status]);
						return this
					},
					
					abort: function(e) {
						var t = e || $;
						return u && u.abort(t), i(0, t), this
					}
				};
			
			if (m.promise(w).complete = g.add, w.success = w.done, w.error = w.fail, p.url = ((e || p.url || Et) + "").replace(Ut, "").replace(It, St[1] + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = ue.trim(p.dataType || "*").toLowerCase().match(pe) || [""], null == p.crossDomain && (r = zt.exec(p.url.toLowerCase()), p.crossDomain = !(!r || r[1] === St[1] && r[2] === St[2] && (r[3] || ("http:" === r[1] ? "80" : "443")) === (St[3] || ("http:" === St[1] ? "80" : "443")))), p.data && p.processData && "string" != typeof p.data && (p.data = ue.param(p.data, p.traditional)), A(Bt, p, n, w), 2 === b) return w;
			l = p.global, l && 0 === ue.active++ && ue.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !Mt.test(p.type), o = p.url, p.hasContent || (p.data && (o = p.url += (Dt.test(o) ? "&" : "?") + p.data, delete p.data), p.cache === !1 && (p.url = Rt.test(o) ? o.replace(Rt, "$1_=" + At++) : o + (Dt.test(o) ? "&" : "?") + "_=" + At++)), p.ifModified && (ue.lastModified[o] && w.setRequestHeader("If-Modified-Since", ue.lastModified[o]), ue.etag[o] && w.setRequestHeader("If-None-Match", ue.etag[o])), (p.data && p.hasContent && p.contentType !== !1 || n.contentType) && w.setRequestHeader("Content-Type", p.contentType), w.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Vt + "; q=0.01" : "") : p.accepts["*"]);
			for (s in p.headers) w.setRequestHeader(s, p.headers[s]);
			if (p.beforeSend && (p.beforeSend.call(f, w, p) === !1 || 2 === b)) return w.abort();
			
			$ = "abort";
			for (s in {
				success: 1,
				error: 1,
				complete: 1
			}) w[s](p[s]);
			if (u = A(Jt, p, n, w)) {
				w.readyState = 1, l && h.trigger("ajaxSend", [w, p]), p.async && p.timeout > 0 && (c = setTimeout(function() {
					w.abort("timeout")
				}, p.timeout));
				try {
					b = 1, u.send(v, i)
				} catch (j) {
					if (!(2 > b)) throw j;
					i(-1, j)
				}
			} else i(-1, "No Transport");
			return w
		},
		
		getJSON: function(e, t, n) {
			return ue.get(e, t, n, "json")
		},
		
		getScript: function(e, n) {
			return ue.get(e, t, n, "script")
		}
	}), ue.each(["get", "post"], function(e, n) {
		ue[n] = function(e, i, r, s) {
			return ue.isFunction(i) && (s = s || r, r = i, i = t), ue.ajax({
				url: e,
				type: n,
				dataType: s,
				data: i,
				success: r
			})
		}
	}), ue.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		
		contents: {
			script: /(?:java|ecma)script/
		},
		
		converters: {
			"text script": function(e) {
				return ue.globalEval(e), e
			}
		}
	}), ue.ajaxPrefilter("script", function(e) {
		e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
	}), ue.ajaxTransport("script", function(e) {
		if (e.crossDomain) {
			var n, i = X.head || ue("head")[0] || X.documentElement;
			return {
				send: function(t, r) {
					n = X.createElement("script"), n.async = !0, e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function(e, t) {
						(t || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, n.parentNode && n.parentNode.removeChild(n), n = null, t || r(200, "success"))
					}, i.insertBefore(n, i.firstChild)
				},
				
				abort: function() {
					n && n.onload(t, !0)
				}
			}
		}
	});
	
	var qt = [],
		Wt = /(=)\?(?=&|$)|\?\?/;
	ue.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			var e = qt.pop() || ue.expando + "_" + At++;
			return this[e] = !0, e
		}
	}), ue.ajaxPrefilter("json jsonp", function(n, i, r) {
		var s, o, a, c = n.jsonp !== !1 && (Wt.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Wt.test(n.data) && "data");
		return c || "jsonp" === n.dataTypes[0] ? (s = n.jsonpCallback = ue.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, c ? n[c] = n[c].replace(Wt, "$1" + s) : n.jsonp !== !1 && (n.url += (Dt.test(n.url) ? "&" : "?") + n.jsonp + "=" + s), n.converters["script json"] = function() {
			return a || ue.error(s + " was not called"), a[0]
		}, n.dataTypes[0] = "json", o = e[s], e[s] = function() {
			a = arguments
		}, r.always(function() {
			e[s] = o, n[s] && (n.jsonpCallback = i.jsonpCallback, qt.push(s)), a && ue.isFunction(o) && o(a[0]), a = o = t
		}), "script") : t
	});
	
	var Gt, Yt, Xt = 0,
		Kt = e.ActiveXObject &&
		function() {
			var e;
			for (e in Gt) Gt[e](t, !0)
		};
	
	ue.ajaxSettings.xhr = e.ActiveXObject ?
	function() {
		return !this.isLocal && F() || P()
	} : F, Yt = ue.ajaxSettings.xhr(), ue.support.cors = !! Yt && "withCredentials" in Yt, Yt = ue.support.ajax = !! Yt, Yt && ue.ajaxTransport(function(n) {
		if (!n.crossDomain || ue.support.cors) {
			var i;
			return {
				send: function(r, s) {
					var o, a, c = n.xhr();
					
					if (n.username ? c.open(n.type, n.url, n.async, n.username, n.password) : c.open(n.type, n.url, n.async), n.xhrFields) for (a in n.xhrFields) c[a] = n.xhrFields[a];
					n.mimeType && c.overrideMimeType && c.overrideMimeType(n.mimeType), n.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest");
					try {
						for (a in r) c.setRequestHeader(a, r[a])
					} catch (l) {}
					c.send(n.hasContent && n.data || null), i = function(e, r) {
						var a, l, u, d;
						try {
							if (i && (r || 4 === c.readyState)) if (i = t, o && (c.onreadystatechange = ue.noop, Kt && delete Gt[o]), r) 4 !== c.readyState && c.abort();
							else {
								d = {}, a = c.status, l = c.getAllResponseHeaders(), "string" == typeof c.responseText && (d.text = c.responseText);
								try {
									u = c.statusText
								} catch (p) {
									u = ""
								}
								a || !n.isLocal || n.crossDomain ? 1223 === a && (a = 204) : a = d.text ? 200 : 404
							}
						} catch (f) {
							r || s(-1, f)
						}
						d && s(a, u, d, l)
					}, n.async ? 4 === c.readyState ? setTimeout(i) : (o = ++Xt, Kt && (Gt || (Gt = {}, ue(e).unload(Kt)), Gt[o] = i), c.onreadystatechange = i) : i()
				},
				
				abort: function() {
					i && i(t, !0)
				}
			}
		}
	});
	
	var Zt, Qt, en = /^(?:toggle|show|hide)$/,
		tn = RegExp("^(?:([+-])=|)(" + de + ")([a-z%]*)$", "i"),
		nn = /queueHooks$/,
		rn = [B],
		sn = {
			"*": [function(e, t) {
				var n = this.createTween(e, t),
					i = n.cur(),
					r = tn.exec(t),
					s = r && r[3] || (ue.cssNumber[e] ? "" : "px"),
					o = (ue.cssNumber[e] || "px" !== s && +i) && tn.exec(ue.css(n.elem, e)),
					a = 1,
					c = 20;
				if (o && o[3] !== s) {
					s = s || o[3], r = r || [], o = +i || 1;
					do a = a || ".5", o /= a, ue.style(n.elem, e, o + s);
					while (a !== (a = n.cur() / i) && 1 !== a && --c)
				}
				return r && (o = n.start = +o || +i || 0, n.unit = s, n.end = r[1] ? o + (r[1] + 1) * r[2] : +r[2]), n
			}]
		};
	
	ue.Animation = ue.extend(z, {
		tweener: function(e, t) {
			ue.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
			for (var n, i = 0, r = e.length; r > i; i++) n = e[i], sn[n] = sn[n] || [], sn[n].unshift(t)
		},
		
		prefilter: function(e, t) {
			t ? rn.unshift(e) : rn.push(e)
		}
	}), ue.Tween = J, J.prototype = {
		constructor: J,
		init: function(e, t, n, i, r, s) {
			this.elem = e, this.prop = n, this.easing = r || "swing", this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = s || (ue.cssNumber[n] ? "" : "px")
		},
		
		cur: function() {
			var e = J.propHooks[this.prop];
			return e && e.get ? e.get(this) : J.propHooks._default.get(this)
		},
		
		run: function(e) {
			var t, n = J.propHooks[this.prop];
			return this.pos = t = this.options.duration ? ue.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : J.propHooks._default.set(this), this
		}
	}, J.prototype.init.prototype = J.prototype, J.propHooks = {
		_default: {
			get: function(e) {
				var t;
				return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = ue.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
			},
			
			set: function(e) {
				ue.fx.step[e.prop] ? ue.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[ue.cssProps[e.prop]] || ue.cssHooks[e.prop]) ? ue.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
			}
		}
	}, J.propHooks.scrollTop = J.propHooks.scrollLeft = {
		set: function(e) {
			e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
		}
	}, ue.each(["toggle", "show", "hide"], function(e, t) {
		var n = ue.fn[t];
		ue.fn[t] = function(e, i, r) {
			return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(V(t, !0), e, i, r)
		}
	}), ue.fn.extend({
		fadeTo: function(e, t, n, i) {
			return this.filter(j).css("opacity", 0).show().end().animate({
				opacity: t
			}, e, n, i)
		},
		
		animate: function(e, t, n, i) {
			var r = ue.isEmptyObject(e),
				s = ue.speed(t, n, i),
				o = function() {
					var t = z(this, ue.extend({}, e), s);
					(r || ue._data(this, "finish")) && t.stop(!0)
				};
			
			return o.finish = o, r || s.queue === !1 ? this.each(o) : this.queue(s.queue, o)
		},
		
		stop: function(e, n, i) {
			var r = function(e) {
				var t = e.stop;
				delete e.stop, t(i)
			};
			
			return "string" != typeof e && (i = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(function() {
				var t = !0,
					n = null != e && e + "queueHooks",
					s = ue.timers,
					o = ue._data(this);
				if (n) o[n] && o[n].stop && r(o[n]);
				else
				for (n in o) o[n] && o[n].stop && nn.test(n) && r(o[n]);
				for (n = s.length; n--;) s[n].elem !== this || null != e && s[n].queue !== e || (s[n].anim.stop(i), t = !1, s.splice(n, 1));
				(t || !i) && ue.dequeue(this, e)
			})
		},
		
		finish: function(e) {
			return e !== !1 && (e = e || "fx"), this.each(function() {
				var t, n = ue._data(this),
					i = n[e + "queue"],
					r = n[e + "queueHooks"],
					s = ue.timers,
					o = i ? i.length : 0;
				for (n.finish = !0, ue.queue(this, e, []), r && r.stop && r.stop.call(this, !0), t = s.length; t--;) s[t].elem === this && s[t].queue === e && (s[t].anim.stop(!0), s.splice(t, 1));
				for (t = 0; o > t; t++) i[t] && i[t].finish && i[t].finish.call(this);
				delete n.finish
			})
		}
	}), ue.each({
		slideDown: V("show"),
		slideUp: V("hide"),
		slideToggle: V("toggle"),
		fadeIn: {
			opacity: "show"
		},
		
		fadeOut: {
			opacity: "hide"
		},
		
		fadeToggle: {
			opacity: "toggle"
		}
	}, function(e, t) {
		ue.fn[e] = function(e, n, i) {
			return this.animate(t, e, n, i)
		}
	}), ue.speed = function(e, t, n) {
		var i = e && "object" == typeof e ? ue.extend({}, e) : {
			complete: n || !n && t || ue.isFunction(e) && e,
			duration: e,
			easing: n && t || t && !ue.isFunction(t) && t
		};
		
		return i.duration = ue.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in ue.fx.speeds ? ue.fx.speeds[i.duration] : ue.fx.speeds._default, (null == i.queue || i.queue === !0) && (i.queue = "fx"), i.old = i.complete, i.complete = function() {
			ue.isFunction(i.old) && i.old.call(this), i.queue && ue.dequeue(this, i.queue)
		}, i
	}, ue.easing = {
		linear: function(e) {
			return e
		},
		
		swing: function(e) {
			return .5 - Math.cos(e * Math.PI) / 2
		}
	}, ue.timers = [], ue.fx = J.prototype.init, ue.fx.tick = function() {
		var e, n = ue.timers,
			i = 0;
		for (Zt = ue.now(); n.length > i; i++) e = n[i], e() || n[i] !== e || n.splice(i--, 1);
		n.length || ue.fx.stop(), Zt = t
	}, ue.fx.timer = function(e) {
		e() && ue.timers.push(e) && ue.fx.start()
	}, ue.fx.interval = 13, ue.fx.start = function() {
		Qt || (Qt = setInterval(ue.fx.tick, ue.fx.interval))
	}, ue.fx.stop = function() {
		clearInterval(Qt), Qt = null
	}, ue.fx.speeds = {
		slow: 600,
		fast: 200,
		_default: 400
	}, ue.fx.step = {}, ue.expr && ue.expr.filters && (ue.expr.filters.animated = function(e) {
		return ue.grep(ue.timers, function(t) {
			return e === t.elem
		}).length
	}), ue.fn.offset = function(e) {
		if (arguments.length) return e === t ? this : this.each(function(t) {
			ue.offset.setOffset(this, e, t)
		});
		
		var n, i, r = {
			top: 0,
			left: 0
		},
			s = this[0],
			o = s && s.ownerDocument;
		return o ? (n = o.documentElement, ue.contains(n, s) ? (typeof s.getBoundingClientRect !== G && (r = s.getBoundingClientRect()), i = H(o), {
			top: r.top + (i.pageYOffset || n.scrollTop) - (n.clientTop || 0),
			left: r.left + (i.pageXOffset || n.scrollLeft) - (n.clientLeft || 0)
		}) : r) : void 0
	}, ue.offset = {
		setOffset: function(e, t, n) {
			var i = ue.css(e, "position");
			"static" === i && (e.style.position = "relative");
			var r, s, o = ue(e),
				a = o.offset(),
				c = ue.css(e, "top"),
				l = ue.css(e, "left"),
				u = ("absolute" === i || "fixed" === i) && ue.inArray("auto", [c, l]) > -1,
				d = {},
				p = {};
			
			u ? (p = o.position(), r = p.top, s = p.left) : (r = parseFloat(c) || 0, s = parseFloat(l) || 0), ue.isFunction(t) && (t = t.call(e, n, a)), null != t.top && (d.top = t.top - a.top + r), null != t.left && (d.left = t.left - a.left + s), "using" in t ? t.using.call(e, d) : o.css(d)
		}
	}, ue.fn.extend({
		position: function() {
			if (this[0]) {
				var e, t, n = {
					top: 0,
					left: 0
				},
					i = this[0];
				return "fixed" === ue.css(i, "position") ? t = i.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), ue.nodeName(e[0], "html") || (n = e.offset()), n.top += ue.css(e[0], "borderTopWidth", !0), n.left += ue.css(e[0], "borderLeftWidth", !0)), {
					top: t.top - n.top - ue.css(i, "marginTop", !0),
					left: t.left - n.left - ue.css(i, "marginLeft", !0)
				}
			}
		},
		
		offsetParent: function() {
			return this.map(function() {
				for (var e = this.offsetParent || K; e && !ue.nodeName(e, "html") && "static" === ue.css(e, "position");) e = e.offsetParent;
				return e || K
			})
		}
	}), ue.each({
		scrollLeft: "pageXOffset",
		scrollTop: "pageYOffset"
	}, function(e, n) {
		var i = /Y/.test(n);
		ue.fn[e] = function(r) {
			return ue.access(this, function(e, r, s) {
				var o = H(e);
				return s === t ? o ? n in o ? o[n] : o.document.documentElement[r] : e[r] : (o ? o.scrollTo(i ? ue(o).scrollLeft() : s, i ? s : ue(o).scrollTop()) : e[r] = s, t)
			}, e, r, arguments.length, null)
		}
	}), ue.each({
		Height: "height",
		Width: "width"
	}, function(e, n) {
		ue.each({
			padding: "inner" + e,
			content: n,
			"": "outer" + e
		}, function(i, r) {
			ue.fn[r] = function(r, s) {
				var o = arguments.length && (i || "boolean" != typeof r),
					a = i || (r === !0 || s === !0 ? "margin" : "border");
				return ue.access(this, function(n, i, r) {
					var s;
					return ue.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (s = n.documentElement, Math.max(n.body["scroll" + e], s["scroll" + e], n.body["offset" + e], s["offset" + e], s["client" + e])) : r === t ? ue.css(n, i, a) : ue.style(n, i, r, a)
				}, n, o ? r : t, o, null)
			}
		})
	}), ue.fn.size = function() {
		return this.length
	}, ue.fn.andSelf = ue.fn.addBack, "object" == typeof module && module && "object" == typeof module.exports ? module.exports = ue : (e.jQuery = e.$ = ue, "function" == typeof define && define.amd && define("jquery", [], function() {
		return ue
	}))
}(window), function() {
	var e = this,
		t = e._,
		n = Array.prototype,
		i = Object.prototype,
		r = Function.prototype,
		s = n.push,
		o = n.slice,
		a = n.concat,
		c = i.toString,
		l = i.hasOwnProperty,
		u = Array.isArray,
		d = Object.keys,
		p = r.bind,
		f = function(e) {
			return e instanceof f ? e : this instanceof f ? void(this._wrapped = e) : new f(e)
		};
	"undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = f), exports._ = f) : e._ = f, f.VERSION = "1.7.0";
	var h = function(e, t, n) {
		if (void 0 === t) return e;
		switch (null == n ? 3 : n) {
			case 1:
				return function(n) {
					return e.call(t, n)
				};
			case 2:
				return function(n, i) {
					return e.call(t, n, i)
				};
			case 3:
				return function(n, i, r) {
					return e.call(t, n, i, r)
				};
			case 4:
				return function(n, i, r, s) {
					return e.call(t, n, i, r, s)
				}
		}
		return function() {
			return e.apply(t, arguments)
		}
	};
	
	f.iteratee = function(e, t, n) {
		return null == e ? f.identity : f.isFunction(e) ? h(e, t, n) : f.isObject(e) ? f.matches(e) : f.property(e)
	}, f.each = f.forEach = function(e, t, n) {
		if (null == e) return e;
		t = h(t, n);
		var i, r = e.length;
		if (r === +r) for (i = 0; i < r; i++) t(e[i], i, e);
		else {
			var s = f.keys(e);
			for (i = 0, r = s.length; i < r; i++) t(e[s[i]], s[i], e)
		}
		return e
	}, f.map = f.collect = function(e, t, n) {
		if (null == e) return [];
		t = f.iteratee(t, n);
		for (var i, r = e.length !== +e.length && f.keys(e), s = (r || e).length, o = Array(s), a = 0; a < s; a++) i = r ? r[a] : a, o[a] = t(e[i], i, e);
		return o
	};
	
	var m = "Reduce of empty array with no initial value";
	f.reduce = f.foldl = f.inject = function(e, t, n, i) {
		null == e && (e = []), t = h(t, i, 4);
		var r, s = e.length !== +e.length && f.keys(e),
			o = (s || e).length,
			a = 0;
		if (arguments.length < 3) {
			if (!o) throw new TypeError(m);
			n = e[s ? s[a++] : a++]
		}
		for (; a < o; a++) r = s ? s[a] : a, n = t(n, e[r], r, e);
		return n
	}, f.reduceRight = f.foldr = function(e, t, n, i) {
		null == e && (e = []), t = h(t, i, 4);
		var r, s = e.length !== +e.length && f.keys(e),
			o = (s || e).length;
		if (arguments.length < 3) {
			if (!o) throw new TypeError(m);
			n = e[s ? s[--o] : --o]
		}
		for (; o--;) r = s ? s[o] : o, n = t(n, e[r], r, e);
		return n
	}, f.find = f.detect = function(e, t, n) {
		var i;
		return t = f.iteratee(t, n), f.some(e, function(e, n, r) {
			if (t(e, n, r)) return i = e, !0
		}), i
	}, f.filter = f.select = function(e, t, n) {
		var i = [];
		return null == e ? i : (t = f.iteratee(t, n), f.each(e, function(e, n, r) {
			t(e, n, r) && i.push(e)
		}), i)
	}, f.reject = function(e, t, n) {
		return f.filter(e, f.negate(f.iteratee(t)), n)
	}, f.every = f.all = function(e, t, n) {
		if (null == e) return !0;
		t = f.iteratee(t, n);
		var i, r, s = e.length !== +e.length && f.keys(e),
			o = (s || e).length;
		for (i = 0; i < o; i++) if (r = s ? s[i] : i, !t(e[r], r, e)) return !1;
		return !0
	}, f.some = f.any = function(e, t, n) {
		if (null == e) return !1;
		t = f.iteratee(t, n);
		var i, r, s = e.length !== +e.length && f.keys(e),
			o = (s || e).length;
		for (i = 0; i < o; i++) if (r = s ? s[i] : i, t(e[r], r, e)) return !0;
		return !1
	}, f.contains = f.include = function(e, t) {
		return null != e && (e.length !== +e.length && (e = f.values(e)), f.indexOf(e, t) >= 0)
	}, f.invoke = function(e, t) {
		var n = o.call(arguments, 2),
			i = f.isFunction(t);
		return f.map(e, function(e) {
			return (i ? t : e[t]).apply(e, n)
		})
	}, f.pluck = function(e, t) {
		return f.map(e, f.property(t))
	}, f.where = function(e, t) {
		return f.filter(e, f.matches(t))
	}, f.findWhere = function(e, t) {
		return f.find(e, f.matches(t))
	}, f.max = function(e, t, n) {
		var i, r, s = -(1 / 0),
			o = -(1 / 0);
		if (null == t && null != e) {
			e = e.length === +e.length ? e : f.values(e);
			for (var a = 0, c = e.length; a < c; a++) i = e[a], i > s && (s = i)
		} else t = f.iteratee(t, n), f.each(e, function(e, n, i) {
			r = t(e, n, i), (r > o || r === -(1 / 0) && s === -(1 / 0)) && (s = e, o = r)
		});
		
		return s
	}, f.min = function(e, t, n) {
		var i, r, s = 1 / 0,
			o = 1 / 0;
		if (null == t && null != e) {
			e = e.length === +e.length ? e : f.values(e);
			for (var a = 0, c = e.length; a < c; a++) i = e[a], i < s && (s = i)
		} else t = f.iteratee(t, n), f.each(e, function(e, n, i) {
			r = t(e, n, i), (r < o || r === 1 / 0 && s === 1 / 0) && (s = e, o = r)
		});
		
		return s
	}, f.shuffle = function(e) {
		for (var t, n = e && e.length === +e.length ? e : f.values(e), i = n.length, r = Array(i), s = 0; s < i; s++) t = f.random(0, s), t !== s && (r[s] = r[t]), r[t] = n[s];
		return r
	}, f.sample = function(e, t, n) {
		return null == t || n ? (e.length !== +e.length && (e = f.values(e)), e[f.random(e.length - 1)]) : f.shuffle(e).slice(0, Math.max(0, t))
	}, f.sortBy = function(e, t, n) {
		return t = f.iteratee(t, n), f.pluck(f.map(e, function(e, n, i) {
			return {
				value: e,
				index: n,
				criteria: t(e, n, i)
			}
		}).sort(function(e, t) {
			var n = e.criteria,
				i = t.criteria;
			if (n !== i) {
				if (n > i || void 0 === n) return 1;
				if (n < i || void 0 === i) return -1
			}
			return e.index - t.index
		}), "value")
	};
	
	var g = function(e) {
		return function(t, n, i) {
			var r = {};
			
			return n = f.iteratee(n, i), f.each(t, function(i, s) {
				var o = n(i, s, t);
				e(r, i, o)
			}), r
		}
	};
	
	f.groupBy = g(function(e, t, n) {
		f.has(e, n) ? e[n].push(t) : e[n] = [t]
	}), f.indexBy = g(function(e, t, n) {
		e[n] = t
	}), f.countBy = g(function(e, t, n) {
		f.has(e, n) ? e[n]++ : e[n] = 1
	}), f.sortedIndex = function(e, t, n, i) {
		n = f.iteratee(n, i, 1);
		for (var r = n(t), s = 0, o = e.length; s < o;) {
			var a = s + o >>> 1;
			n(e[a]) < r ? s = a + 1 : o = a
		}
		return s
	}, f.toArray = function(e) {
		return e ? f.isArray(e) ? o.call(e) : e.length === +e.length ? f.map(e, f.identity) : f.values(e) : []
	}, f.size = function(e) {
		return null == e ? 0 : e.length === +e.length ? e.length : f.keys(e).length
	}, f.partition = function(e, t, n) {
		t = f.iteratee(t, n);
		var i = [],
			r = [];
		return f.each(e, function(e, n, s) {
			(t(e, n, s) ? i : r).push(e)
		}), [i, r]
	}, f.first = f.head = f.take = function(e, t, n) {
		if (null != e) return null == t || n ? e[0] : t < 0 ? [] : o.call(e, 0, t)
	}, f.initial = function(e, t, n) {
		return o.call(e, 0, Math.max(0, e.length - (null == t || n ? 1 : t)))
	}, f.last = function(e, t, n) {
		if (null != e) return null == t || n ? e[e.length - 1] : o.call(e, Math.max(e.length - t, 0))
	}, f.rest = f.tail = f.drop = function(e, t, n) {
		return o.call(e, null == t || n ? 1 : t)
	}, f.compact = function(e) {
		return f.filter(e, f.identity)
	};
	
	var _ = function(e, t, n, i) {
		if (t && f.every(e, f.isArray)) return a.apply(i, e);
		for (var r = 0, o = e.length; r < o; r++) {
			var c = e[r];
			f.isArray(c) || f.isArguments(c) ? t ? s.apply(i, c) : _(c, t, n, i) : n || i.push(c)
		}
		return i
	};
	
	f.flatten = function(e, t) {
		return _(e, t, !1, [])
	}, f.without = function(e) {
		return f.difference(e, o.call(arguments, 1))
	}, f.uniq = f.unique = function(e, t, n, i) {
		if (null == e) return [];
		f.isBoolean(t) || (i = n, n = t, t = !1), null != n && (n = f.iteratee(n, i));
		for (var r = [], s = [], o = 0, a = e.length; o < a; o++) {
			var c = e[o];
			if (t) o && s === c || r.push(c), s = c;
			else if (n) {
				var l = n(c, o, e);
				f.indexOf(s, l) < 0 && (s.push(l), r.push(c))
			} else f.indexOf(r, c) < 0 && r.push(c)
		}
		return r
	}, f.union = function() {
		return f.uniq(_(arguments, !0, !0, []))
	}, f.intersection = function(e) {
		if (null == e) return [];
		for (var t = [], n = arguments.length, i = 0, r = e.length; i < r; i++) {
			var s = e[i];
			if (!f.contains(t, s)) {
				for (var o = 1; o < n && f.contains(arguments[o], s); o++);
				o === n && t.push(s)
			}
		}
		return t
	}, f.difference = function(e) {
		var t = _(o.call(arguments, 1), !0, !0, []);
		return f.filter(e, function(e) {
			return !f.contains(t, e)
		})
	}, f.zip = function(e) {
		if (null == e) return [];
		for (var t = f.max(arguments, "length").length, n = Array(t), i = 0; i < t; i++) n[i] = f.pluck(arguments, i);
		return n
	}, f.object = function(e, t) {
		if (null == e) return {};
		
		for (var n = {}, i = 0, r = e.length; i < r; i++) t ? n[e[i]] = t[i] : n[e[i][0]] = e[i][1];
		return n
	}, f.indexOf = function(e, t, n) {
		if (null == e) return -1;
		var i = 0,
			r = e.length;
		if (n) {
			if ("number" != typeof n) return i = f.sortedIndex(e, t), e[i] === t ? i : -1;
			i = n < 0 ? Math.max(0, r + n) : n
		}
		for (; i < r; i++) if (e[i] === t) return i;
		return -1
	}, f.lastIndexOf = function(e, t, n) {
		if (null == e) return -1;
		var i = e.length;
		for ("number" == typeof n && (i = n < 0 ? i + n + 1 : Math.min(i, n + 1)); --i >= 0;) if (e[i] === t) return i;
		return -1
	}, f.range = function(e, t, n) {
		arguments.length <= 1 && (t = e || 0, e = 0), n = n || 1;
		for (var i = Math.max(Math.ceil((t - e) / n), 0), r = Array(i), s = 0; s < i; s++, e += n) r[s] = e;
		return r
	};
	
	var v = function() {};
	
	f.bind = function(e, t) {
		var n, i;
		if (p && e.bind === p) return p.apply(e, o.call(arguments, 1));
		if (!f.isFunction(e)) throw new TypeError("Bind must be called on a function");
		return n = o.call(arguments, 2), i = function() {
			if (!(this instanceof i)) return e.apply(t, n.concat(o.call(arguments)));
			v.prototype = e.prototype;
			var r = new v;
			v.prototype = null;
			var s = e.apply(r, n.concat(o.call(arguments)));
			return f.isObject(s) ? s : r
		}
	}, f.partial = function(e) {
		var t = o.call(arguments, 1);
		return function() {
			for (var n = 0, i = t.slice(), r = 0, s = i.length; r < s; r++) i[r] === f && (i[r] = arguments[n++]);
			for (; n < arguments.length;) i.push(arguments[n++]);
			return e.apply(this, i)
		}
	}, f.bindAll = function(e) {
		var t, n, i = arguments.length;
		if (i <= 1) throw new Error("bindAll must be passed function names");
		for (t = 1; t < i; t++) n = arguments[t], e[n] = f.bind(e[n], e);
		return e
	}, f.memoize = function(e, t) {
		var n = function(i) {
			var r = n.cache,
				s = t ? t.apply(this, arguments) : i;
			return f.has(r, s) || (r[s] = e.apply(this, arguments)), r[s]
		};
		
		return n.cache = {}, n
	}, f.delay = function(e, t) {
		var n = o.call(arguments, 2);
		return setTimeout(function() {
			return e.apply(null, n)
		}, t)
	}, f.defer = function(e) {
		return f.delay.apply(f, [e, 1].concat(o.call(arguments, 1)))
	}, f.throttle = function(e, t, n) {
		var i, r, s, o = null,
			a = 0;
		n || (n = {});
		
		var c = function() {
			a = n.leading === !1 ? 0 : f.now(), o = null, s = e.apply(i, r), o || (i = r = null)
		};
		
		return function() {
			var l = f.now();
			
			a || n.leading !== !1 || (a = l);
			var u = t - (l - a);
			return i = this, r = arguments, u <= 0 || u > t ? (clearTimeout(o), o = null, a = l, s = e.apply(i, r), o || (i = r = null)) : o || n.trailing === !1 || (o = setTimeout(c, u)), s
		}
	}, f.debounce = function(e, t, n) {
		var i, r, s, o, a, c = function() {
			var l = f.now() - o;
			l < t && l > 0 ? i = setTimeout(c, t - l) : (i = null, n || (a = e.apply(s, r), i || (s = r = null)))
		};
		
		return function() {
			s = this, r = arguments, o = f.now();
			
			var l = n && !i;
			return i || (i = setTimeout(c, t)), l && (a = e.apply(s, r), s = r = null), a
		}
	}, f.wrap = function(e, t) {
		return f.partial(t, e)
	}, f.negate = function(e) {
		return function() {
			return !e.apply(this, arguments)
		}
	}, f.compose = function() {
		var e = arguments,
			t = e.length - 1;
		return function() {
			for (var n = t, i = e[t].apply(this, arguments); n--;) i = e[n].call(this, i);
			return i
		}
	}, f.after = function(e, t) {
		return function() {
			if (--e < 1) return t.apply(this, arguments)
		}
	}, f.before = function(e, t) {
		var n;
		return function() {
			return --e > 0 ? n = t.apply(this, arguments) : t = null, n
		}
	}, f.once = f.partial(f.before, 2), f.keys = function(e) {
		if (!f.isObject(e)) return [];
		if (d) return d(e);
		var t = [];
		for (var n in e) f.has(e, n) && t.push(n);
		return t
	}, f.values = function(e) {
		for (var t = f.keys(e), n = t.length, i = Array(n), r = 0; r < n; r++) i[r] = e[t[r]];
		return i
	}, f.pairs = function(e) {
		for (var t = f.keys(e), n = t.length, i = Array(n), r = 0; r < n; r++) i[r] = [t[r], e[t[r]]];
		return i
	}, f.invert = function(e) {
		for (var t = {}, n = f.keys(e), i = 0, r = n.length; i < r; i++) t[e[n[i]]] = n[i];
		return t
	}, f.functions = f.methods = function(e) {
		var t = [];
		for (var n in e) f.isFunction(e[n]) && t.push(n);
		return t.sort()
	}, f.extend = function(e) {
		if (!f.isObject(e)) return e;
		for (var t, n, i = 1, r = arguments.length; i < r; i++) {
			t = arguments[i];
			for (n in t) l.call(t, n) && (e[n] = t[n])
		}
		return e
	}, f.pick = function(e, t, n) {
		var i, r = {};
		
		if (null == e) return r;
		if (f.isFunction(t)) {
			t = h(t, n);
			for (i in e) {
				var s = e[i];
				t(s, i, e) && (r[i] = s)
			}
		} else {
			var c = a.apply([], o.call(arguments, 1));
			e = new Object(e);
			for (var l = 0, u = c.length; l < u; l++) i = c[l], i in e && (r[i] = e[i])
		}
		return r
	}, f.omit = function(e, t, n) {
		if (f.isFunction(t)) t = f.negate(t);
		else {
			var i = f.map(a.apply([], o.call(arguments, 1)), String);
			t = function(e, t) {
				return !f.contains(i, t)
			}
		}
		return f.pick(e, t, n)
	}, f.defaults = function(e) {
		if (!f.isObject(e)) return e;
		for (var t = 1, n = arguments.length; t < n; t++) {
			var i = arguments[t];
			for (var r in i) void 0 === e[r] && (e[r] = i[r])
		}
		return e
	}, f.clone = function(e) {
		return f.isObject(e) ? f.isArray(e) ? e.slice() : f.extend({}, e) : e
	}, f.tap = function(e, t) {
		return t(e), e
	};
	
	var y = function(e, t, n, i) {
		if (e === t) return 0 !== e || 1 / e === 1 / t;
		if (null == e || null == t) return e === t;
		e instanceof f && (e = e._wrapped), t instanceof f && (t = t._wrapped);
		var r = c.call(e);
		if (r !== c.call(t)) return !1;
		switch (r) {
			case "[object RegExp]":
			case "[object String]":
				return "" + e == "" + t;
			case "[object Number]":
				return +e !== +e ? +t !== +t : 0 === +e ? 1 / +e === 1 / t : +e === +t;
			case "[object Date]":
			case "[object Boolean]":
				return +e === +t
		}
		if ("object" != typeof e || "object" != typeof t) return !1;
		for (var s = n.length; s--;) if (n[s] === e) return i[s] === t;
		var o = e.constructor,
			a = t.constructor;
		if (o !== a && "constructor" in e && "constructor" in t && !(f.isFunction(o) && o instanceof o && f.isFunction(a) && a instanceof a)) return !1;
		n.push(e), i.push(t);
		var l, u;
		if ("[object Array]" === r) {
			if (l = e.length, u = l === t.length) for (; l-- && (u = y(e[l], t[l], n, i)););
		} else {
			var d, p = f.keys(e);
			if (l = p.length, u = f.keys(t).length === l) for (; l-- && (d = p[l], u = f.has(t, d) && y(e[d], t[d], n, i)););
		}
		return n.pop(), i.pop(), u
	};
	
	f.isEqual = function(e, t) {
		return y(e, t, [], [])
	}, f.isEmpty = function(e) {
		if (null == e) return !0;
		if (f.isArray(e) || f.isString(e) || f.isArguments(e)) return 0 === e.length;
		for (var t in e) if (f.has(e, t)) return !1;
		return !0
	}, f.isElement = function(e) {
		return !(!e || 1 !== e.nodeType)
	}, f.isArray = u ||
	function(e) {
		return "[object Array]" === c.call(e)
	}, f.isObject = function(e) {
		var t = typeof e;
		return "function" === t || "object" === t && !! e
	}, f.each(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(e) {
		f["is" + e] = function(t) {
			return c.call(t) === "[object " + e + "]"
		}
	}), f.isArguments(arguments) || (f.isArguments = function(e) {
		return f.has(e, "callee")
	}), "function" != typeof / . / && (f.isFunction = function(e) {
		return "function" == typeof e || !1
	}), f.isFinite = function(e) {
		return isFinite(e) && !isNaN(parseFloat(e))
	}, f.isNaN = function(e) {
		return f.isNumber(e) && e !== +e
	}, f.isBoolean = function(e) {
		return e === !0 || e === !1 || "[object Boolean]" === c.call(e)
	}, f.isNull = function(e) {
		return null === e
	}, f.isUndefined = function(e) {
		return void 0 === e
	}, f.has = function(e, t) {
		return null != e && l.call(e, t)
	}, f.noConflict = function() {
		return e._ = t, this
	}, f.identity = function(e) {
		return e
	}, f.constant = function(e) {
		return function() {
			return e
		}
	}, f.noop = function() {}, f.property = function(e) {
		return function(t) {
			return t[e]
		}
	}, f.matches = function(e) {
		var t = f.pairs(e),
			n = t.length;
		return function(e) {
			if (null == e) return !n;
			e = new Object(e);
			for (var i = 0; i < n; i++) {
				var r = t[i],
					s = r[0];
				if (r[1] !== e[s] || !(s in e)) return !1
			}
			return !0
		}
	}, f.times = function(e, t, n) {
		var i = Array(Math.max(0, e));
		t = h(t, n, 1);
		for (var r = 0; r < e; r++) i[r] = t(r);
		return i
	}, f.random = function(e, t) {
		return null == t && (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1))
	}, f.now = Date.now ||
	function() {
		return (new Date).getTime()
	};
	
	var b = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		'"': "&quot;",
		"'": "&#x27;",
		"`": "&#x60;"
	},
		$ = f.invert(b),
		w = function(e) {
			var t = function(t) {
				return e[t]
			},
				n = "(?:" + f.keys(e).join("|") + ")",
				i = RegExp(n),
				r = RegExp(n, "g");
			return function(e) {
				return e = null == e ? "" : "" + e, i.test(e) ? e.replace(r, t) : e
			}
		};
	
	f.escape = w(b), f.unescape = w($), f.result = function(e, t) {
		if (null != e) {
			var n = e[t];
			return f.isFunction(n) ? e[t]() : n
		}
	};
	
	var j = 0;
	f.uniqueId = function(e) {
		var t = ++j + "";
		return e ? e + t : t
	}, f.templateSettings = {
		evaluate: /<%([\s\S]+?)%>/g,
		interpolate: /<%=([\s\S]+?)%>/g,
		escape: /<%-([\s\S]+?)%>/g
	};
	
	var x = /(.)^/,
		C = {
			"'": "'",
			"\\": "\\",
			"\r": "r",
			"\n": "n",
			"\u2028": "u2028",
			"\u2029": "u2029"
		},
		k = /\\|'|\r|\n|\u2028|\u2029/g,
		N = function(e) {
			return "\\" + C[e]
		};
	
	f.template = function(e, t, n) {
		!t && n && (t = n), t = f.defaults({}, t, f.templateSettings);
		var i = RegExp([(t.escape || x).source, (t.interpolate || x).source, (t.evaluate || x).source].join("|") + "|$", "g"),
			r = 0,
			s = "__p+='";
		e.replace(i, function(t, n, i, o, a) {
			return s += e.slice(r, a).replace(k, N), r = a + t.length, n ? s += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'" : i ? s += "'+\n((__t=(" + i + "))==null?'':__t)+\n'" : o && (s += "';\n" + o + "\n__p+='"), t
		}), s += "';\n", t.variable || (s = "with(obj||{}){\n" + s + "}\n"), s = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + s + "return __p;\n";
		try {
			var o = new Function(t.variable || "obj", "_", s)
		} catch (a) {
			throw a.source = s, a
		}
		var c = function(e) {
			return o.call(this, e, f)
		},
			l = t.variable || "obj";
		return c.source = "function(" + l + "){\n" + s + "}", c
	}, f.chain = function(e) {
		var t = f(e);
		return t._chain = !0, t
	};
	
	var T = function(e) {
		return this._chain ? f(e).chain() : e
	};
	
	f.mixin = function(e) {
		f.each(f.functions(e), function(t) {
			var n = f[t] = e[t];
			f.prototype[t] = function() {
				var e = [this._wrapped];
				return s.apply(e, arguments), T.call(this, n.apply(f, e))
			}
		})
	}, f.mixin(f), f.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(e) {
		var t = n[e];
		f.prototype[e] = function() {
			var n = this._wrapped;
			return t.apply(n, arguments), "shift" !== e && "splice" !== e || 0 !== n.length || delete n[0], T.call(this, n)
		}
	}), f.each(["concat", "join", "slice"], function(e) {
		var t = n[e];
		f.prototype[e] = function() {
			return T.call(this, t.apply(this._wrapped, arguments))
		}
	}), f.prototype.value = function() {
		return this._wrapped
	}, "function" == typeof define && define.amd && define("underscore", [], function() {
		return f
	})
}.call(this), function(e, t) {
	if ("function" == typeof define && define.amd) define(["underscore", "jquery", "exports"], function(n, i, r) {
		e.Backbone = t(e, r, n, i)
	});
	else if ("undefined" != typeof exports) {
		var n = require("underscore");
		t(e, exports, n)
	} else e.Backbone = t(e, {}, e._, e.jQuery || e.Zepto || e.ender || e.$)
}(this, function(e, t, n, i) {
	var r = e.Backbone,
		s = [],
		o = (s.push, s.slice);
	s.splice;
	t.VERSION = "1.1.2", t.$ = i, t.noConflict = function() {
		return e.Backbone = r, this
	}, t.emulateHTTP = !1, t.emulateJSON = !1;
	var a = t.Events = {
		on: function(e, t, n) {
			if (!l(this, "on", e, [t, n]) || !t) return this;
			this._events || (this._events = {});
			
			var i = this._events[e] || (this._events[e] = []);
			return i.push({
				callback: t,
				context: n,
				ctx: n || this
			}), this
		},
		
		once: function(e, t, i) {
			if (!l(this, "once", e, [t, i]) || !t) return this;
			var r = this,
				s = n.once(function() {
					r.off(e, s), t.apply(this, arguments)
				});
			
			return s._callback = t, this.on(e, s, i)
		},
		
		off: function(e, t, i) {
			var r, s, o, a, c, u, d, p;
			if (!this._events || !l(this, "off", e, [t, i])) return this;
			if (!e && !t && !i) return this._events = void 0, this;
			for (a = e ? [e] : n.keys(this._events), c = 0, u = a.length; c < u; c++) if (e = a[c], o = this._events[e]) {
				if (this._events[e] = r = [], t || i) for (d = 0, p = o.length; d < p; d++) s = o[d], (t && t !== s.callback && t !== s.callback._callback || i && i !== s.context) && r.push(s);
				r.length || delete this._events[e]
			}
			return this
		},
		
		trigger: function(e) {
			if (!this._events) return this;
			var t = o.call(arguments, 1);
			if (!l(this, "trigger", e, t)) return this;
			var n = this._events[e],
				i = this._events.all;
			return n && u(n, t), i && u(i, arguments), this
		},
		
		stopListening: function(e, t, i) {
			var r = this._listeningTo;
			if (!r) return this;
			var s = !t && !i;
			i || "object" != typeof t || (i = this), e && ((r = {})[e._listenId] = e);
			for (var o in r) e = r[o], e.off(t, i, this), (s || n.isEmpty(e._events)) && delete this._listeningTo[o];
			return this
		}
	},
		c = /\s+/,
		l = function(e, t, n, i) {
			if (!n) return !0;
			if ("object" == typeof n) {
				for (var r in n) e[t].apply(e, [r, n[r]].concat(i));
				return !1
			}
			if (c.test(n)) {
				for (var s = n.split(c), o = 0, a = s.length; o < a; o++) e[t].apply(e, [s[o]].concat(i));
				return !1
			}
			return !0
		},
		u = function(e, t) {
			var n, i = -1,
				r = e.length,
				s = t[0],
				o = t[1],
				a = t[2];
			switch (t.length) {
				case 0:
					for (; ++i < r;)(n = e[i]).callback.call(n.ctx);
					return;
				case 1:
					for (; ++i < r;)(n = e[i]).callback.call(n.ctx, s);
					return;
				case 2:
					for (; ++i < r;)(n = e[i]).callback.call(n.ctx, s, o);
					return;
				case 3:
					for (; ++i < r;)(n = e[i]).callback.call(n.ctx, s, o, a);
					return;
				default:
					for (; ++i < r;)(n = e[i]).callback.apply(n.ctx, t);
					return
			}
		},
		d = {
			listenTo: "on",
			listenToOnce: "once"
		};
	
	n.each(d, function(e, t) {
		a[t] = function(t, i, r) {
			var s = this._listeningTo || (this._listeningTo = {}),
				o = t._listenId || (t._listenId = n.uniqueId("l"));
			return s[o] = t, r || "object" != typeof i || (r = this), t[e](i, r, this), this
		}
	}), a.bind = a.on, a.unbind = a.off, n.extend(t, a);
	var p = t.Model = function(e, t) {
		var i = e || {};
		
		t || (t = {}), this.cid = n.uniqueId("c"), this.attributes = {}, t.collection && (this.collection = t.collection), t.parse && (i = this.parse(i, t) || {}), i = n.defaults({}, i, n.result(this, "defaults")), this.set(i, t), this.changed = {}, this.initialize.apply(this, arguments)
	};
	
	n.extend(p.prototype, a, {
		changed: null,
		validationError: null,
		idAttribute: "id",
		initialize: function() {},
		
		toJSON: function(e) {
			return n.clone(this.attributes)
		},
		
		sync: function() {
			return t.sync.apply(this, arguments)
		},
		
		get: function(e) {
			return this.attributes[e]
		},
		
		escape: function(e) {
			return n.escape(this.get(e))
		},
		
		has: function(e) {
			return null != this.get(e)
		},
		
		set: function(e, t, i) {
			var r, s, o, a, c, l, u, d;
			if (null == e) return this;
			if ("object" == typeof e ? (s = e, i = t) : (s = {})[e] = t, i || (i = {}), !this._validate(s, i)) return !1;
			o = i.unset, c = i.silent, a = [], l = this._changing, this._changing = !0, l || (this._previousAttributes = n.clone(this.attributes), this.changed = {}), d = this.attributes, u = this._previousAttributes, this.idAttribute in s && (this.id = s[this.idAttribute]);
			for (r in s) t = s[r], n.isEqual(d[r], t) || a.push(r), n.isEqual(u[r], t) ? delete this.changed[r] : this.changed[r] = t, o ? delete d[r] : d[r] = t;
			if (!c) {
				a.length && (this._pending = i);
				for (var p = 0, f = a.length; p < f; p++) this.trigger("change:" + a[p], this, d[a[p]], i)
			}
			if (l) return this;
			if (!c) for (; this._pending;) i = this._pending, this._pending = !1, this.trigger("change", this, i);
			return this._pending = !1, this._changing = !1, this
		},
		
		unset: function(e, t) {
			return this.set(e, void 0, n.extend({}, t, {
				unset: !0
			}))
		},
		
		clear: function(e) {
			var t = {};
			
			for (var i in this.attributes) t[i] = void 0;
			return this.set(t, n.extend({}, e, {
				unset: !0
			}))
		},
		
		hasChanged: function(e) {
			return null == e ? !n.isEmpty(this.changed) : n.has(this.changed, e)
		},
		
		changedAttributes: function(e) {
			if (!e) return !!this.hasChanged() && n.clone(this.changed);
			var t, i = !1,
				r = this._changing ? this._previousAttributes : this.attributes;
			for (var s in e) n.isEqual(r[s], t = e[s]) || ((i || (i = {}))[s] = t);
			return i
		},
		
		previous: function(e) {
			return null != e && this._previousAttributes ? this._previousAttributes[e] : null
		},
		
		previousAttributes: function() {
			return n.clone(this._previousAttributes)
		},
		
		fetch: function(e) {
			e = e ? n.clone(e) : {}, void 0 === e.parse && (e.parse = !0);
			var t = this,
				i = e.success;
			return e.success = function(n) {
				return !!t.set(t.parse(n, e), e) && (i && i(t, n, e), void t.trigger("sync", t, n, e))
			}, P(this, e), this.sync("read", this, e)
		},
		
		save: function(e, t, i) {
			var r, s, o, a = this.attributes;
			if (null == e || "object" == typeof e ? (r = e, i = t) : (r = {})[e] = t, i = n.extend({
				validate: !0
			}, i), r && !i.wait) {
				if (!this.set(r, i)) return !1
			} else if (!this._validate(r, i)) return !1;
			r && i.wait && (this.attributes = n.extend({}, a, r)), void 0 === i.parse && (i.parse = !0);
			var c = this,
				l = i.success;
			return i.success = function(e) {
				c.attributes = a;
				var t = c.parse(e, i);
				return i.wait && (t = n.extend(r || {}, t)), !(n.isObject(t) && !c.set(t, i)) && (l && l(c, e, i), void c.trigger("sync", c, e, i))
			}, P(this, i), s = this.isNew() ? "create" : i.patch ? "patch" : "update", "patch" === s && (i.attrs = r), o = this.sync(s, this, i), r && i.wait && (this.attributes = a), o
		},
		
		destroy: function(e) {
			e = e ? n.clone(e) : {};
			
			var t = this,
				i = e.success,
				r = function() {
					t.trigger("destroy", t, t.collection, e)
				};
			
			if (e.success = function(n) {
				(e.wait || t.isNew()) && r(), i && i(t, n, e), t.isNew() || t.trigger("sync", t, n, e)
			}, this.isNew()) return e.success(), !1;
			P(this, e);
			var s = this.sync("delete", this, e);
			return e.wait || r(), s
		},
		
		url: function() {
			var e = n.result(this, "urlRoot") || n.result(this.collection, "url") || F();
			
			return this.isNew() ? e : e.replace(/([^\/])$/, "$1/") + encodeURIComponent(this.id)
		},
		
		parse: function(e, t) {
			return e
		},
		
		clone: function() {
			return new this.constructor(this.attributes)
		},
		
		isNew: function() {
			return !this.has(this.idAttribute)
		},
		
		isValid: function(e) {
			return this._validate({}, n.extend(e || {}, {
				validate: !0
			}))
		},
		
		_validate: function(e, t) {
			if (!t.validate || !this.validate) return !0;
			e = n.extend({}, this.attributes, e);
			var i = this.validationError = this.validate(e, t) || null;
			return !i || (this.trigger("invalid", this, i, n.extend(t, {
				validationError: i
			})), !1)
		}
	});
	
	var f = ["keys", "values", "pairs", "invert", "pick", "omit"];
	n.each(f, function(e) {
		p.prototype[e] = function() {
			var t = o.call(arguments);
			return t.unshift(this.attributes), n[e].apply(n, t)
		}
	});
	
	var h = t.Collection = function(e, t) {
		t || (t = {}), t.model && (this.model = t.model), void 0 !== t.comparator && (this.comparator = t.comparator), this._reset(), this.initialize.apply(this, arguments), e && this.reset(e, n.extend({
			silent: !0
		}, t))
	},
		m = {
			add: !0,
			remove: !0,
			merge: !0
		},
		g = {
			add: !0,
			remove: !1
		};
	
	n.extend(h.prototype, a, {
		model: p,
		initialize: function() {},
		
		toJSON: function(e) {
			return this.map(function(t) {
				return t.toJSON(e)
			})
		},
		
		sync: function() {
			return t.sync.apply(this, arguments)
		},
		
		add: function(e, t) {
			return this.set(e, n.extend({
				merge: !1
			}, t, g))
		},
		
		remove: function(e, t) {
			var i = !n.isArray(e);
			e = i ? [e] : n.clone(e), t || (t = {});
			
			var r, s, o, a;
			for (r = 0, s = e.length; r < s; r++) a = e[r] = this.get(e[r]), a && (delete this._byId[a.id], delete this._byId[a.cid], o = this.indexOf(a), this.models.splice(o, 1), this.length--, t.silent || (t.index = o, a.trigger("remove", a, this, t)), this._removeReference(a, t));
			return i ? e[0] : e
		},
		
		set: function(e, t) {
			t = n.defaults({}, t, m), t.parse && (e = this.parse(e, t));
			var i = !n.isArray(e);
			e = i ? e ? [e] : [] : n.clone(e);
			var r, s, o, a, c, l, u, d = t.at,
				f = this.model,
				h = this.comparator && null == d && t.sort !== !1,
				g = n.isString(this.comparator) ? this.comparator : null,
				_ = [],
				v = [],
				y = {},
				b = t.add,
				$ = t.merge,
				w = t.remove,
				j = !(h || !b || !w) && [];
			for (r = 0, s = e.length; r < s; r++) {
				if (c = e[r] || {}, o = c instanceof p ? a = c : c[f.prototype.idAttribute || "id"], l = this.get(o)) w && (y[l.cid] = !0), $ && (c = c === a ? a.attributes : c, t.parse && (c = l.parse(c, t)), l.set(c, t), h && !u && l.hasChanged(g) && (u = !0)), e[r] = l;
				else if (b) {
					if (a = e[r] = this._prepareModel(c, t), !a) continue;
					_.push(a), this._addReference(a, t)
				}
				a = l || a, !j || !a.isNew() && y[a.id] || j.push(a), y[a.id] = !0
			}
			if (w) {
				for (r = 0, s = this.length; r < s; ++r) y[(a = this.models[r]).cid] || v.push(a);
				v.length && this.remove(v, t)
			}
			if (_.length || j && j.length) if (h && (u = !0), this.length += _.length, null != d) for (r = 0, s = _.length; r < s; r++) this.models.splice(d + r, 0, _[r]);
			else {
				j && (this.models.length = 0);
				var x = j || _;
				for (r = 0, s = x.length; r < s; r++) this.models.push(x[r])
			}
			if (u && this.sort({
				silent: !0
			}), !t.silent) {
				for (r = 0, s = _.length; r < s; r++)(a = _[r]).trigger("add", a, this, t);
				(u || j && j.length) && this.trigger("sort", this, t)
			}
			return i ? e[0] : e
		},
		
		reset: function(e, t) {
			t || (t = {});
			
			for (var i = 0, r = this.models.length; i < r; i++) this._removeReference(this.models[i], t);
			return t.previousModels = this.models, this._reset(), e = this.add(e, n.extend({
				silent: !0
			}, t)), t.silent || this.trigger("reset", this, t), e
		},
		
		push: function(e, t) {
			return this.add(e, n.extend({
				at: this.length
			}, t))
		},
		
		pop: function(e) {
			var t = this.at(this.length - 1);
			return this.remove(t, e), t
		},
		
		unshift: function(e, t) {
			return this.add(e, n.extend({
				at: 0
			}, t))
		},
		
		shift: function(e) {
			var t = this.at(0);
			return this.remove(t, e), t
		},
		
		slice: function() {
			return o.apply(this.models, arguments)
		},
		
		get: function(e) {
			if (null != e) return this._byId[e] || this._byId[e.id] || this._byId[e.cid]
		},
		
		at: function(e) {
			return this.models[e]
		},
		
		where: function(e, t) {
			return n.isEmpty(e) ? t ? void 0 : [] : this[t ? "find" : "filter"](function(t) {
				for (var n in e) if (e[n] !== t.get(n)) return !1;
				return !0
			})
		},
		
		findWhere: function(e) {
			return this.where(e, !0)
		},
		
		sort: function(e) {
			if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
			return e || (e = {}), n.isString(this.comparator) || 1 === this.comparator.length ? this.models = this.sortBy(this.comparator, this) : this.models.sort(n.bind(this.comparator, this)), e.silent || this.trigger("sort", this, e), this
		},
		
		pluck: function(e) {
			return n.invoke(this.models, "get", e)
		},
		
		fetch: function(e) {
			e = e ? n.clone(e) : {}, void 0 === e.parse && (e.parse = !0);
			var t = e.success,
				i = this;
			return e.success = function(n) {
				var r = e.reset ? "reset" : "set";
				i[r](n, e), t && t(i, n, e), i.trigger("sync", i, n, e)
			}, P(this, e), this.sync("read", this, e)
		},
		
		create: function(e, t) {
			if (t = t ? n.clone(t) : {}, !(e = this._prepareModel(e, t))) return !1;
			t.wait || this.add(e, t);
			var i = this,
				r = t.success;
			return t.success = function(e, n) {
				t.wait && i.add(e, t), r && r(e, n, t)
			}, e.save(null, t), e
		},
		
		parse: function(e, t) {
			return e
		},
		
		clone: function() {
			return new this.constructor(this.models)
		},
		
		_reset: function() {
			this.length = 0, this.models = [], this._byId = {}
		},
		
		_prepareModel: function(e, t) {
			if (e instanceof p) return e;
			t = t ? n.clone(t) : {}, t.collection = this;
			var i = new this.model(e, t);
			return i.validationError ? (this.trigger("invalid", this, i.validationError, t), !1) : i
		},
		
		_addReference: function(e, t) {
			this._byId[e.cid] = e, null != e.id && (this._byId[e.id] = e), e.collection || (e.collection = this), e.on("all", this._onModelEvent, this)
		},
		
		_removeReference: function(e, t) {
			this === e.collection && delete e.collection, e.off("all", this._onModelEvent, this)
		},
		
		_onModelEvent: function(e, t, n, i) {
			("add" !== e && "remove" !== e || n === this) && ("destroy" === e && this.remove(t, i), t && e === "change:" + t.idAttribute && (delete this._byId[t.previous(t.idAttribute)], null != t.id && (this._byId[t.id] = t)), this.trigger.apply(this, arguments))
		}
	});
	
	var _ = ["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "difference", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain", "sample"];
	n.each(_, function(e) {
		h.prototype[e] = function() {
			var t = o.call(arguments);
			return t.unshift(this.models), n[e].apply(n, t)
		}
	});
	
	var v = ["groupBy", "countBy", "sortBy", "indexBy"];
	n.each(v, function(e) {
		h.prototype[e] = function(t, i) {
			var r = n.isFunction(t) ? t : function(e) {
				return e.get(t)
			};
			
			return n[e](this.models, r, i)
		}
	});
	
	var y = t.View = function(e) {
		this.cid = n.uniqueId("view"), e || (e = {}), n.extend(this, n.pick(e, $)), this._ensureElement(), this.initialize.apply(this, arguments), this.delegateEvents()
	},
		b = /^(\S+)\s*(.*)$/,
		$ = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
	n.extend(y.prototype, a, {
		tagName: "div",
		$: function(e) {
			return this.$el.find(e)
		},
		
		initialize: function() {},
		
		render: function() {
			return this
		},
		
		remove: function() {
			return this.$el.remove(), this.stopListening(), this
		},
		
		setElement: function(e, n) {
			return this.$el && this.undelegateEvents(), this.$el = e instanceof t.$ ? e : t.$(e), this.el = this.$el[0], n !== !1 && this.delegateEvents(), this
		},
		
		delegateEvents: function(e) {
			if (!e && !(e = n.result(this, "events"))) return this;
			this.undelegateEvents();
			
			for (var t in e) {
				var i = e[t];
				if (n.isFunction(i) || (i = this[e[t]]), i) {
					var r = t.match(b),
						s = r[1],
						o = r[2];
					i = n.bind(i, this), s += ".delegateEvents" + this.cid, "" === o ? this.$el.on(s, i) : this.$el.on(s, o, i)
				}
			}
			return this
		},
		
		undelegateEvents: function() {
			return this.$el.off(".delegateEvents" + this.cid), this
		},
		
		_ensureElement: function() {
			if (this.el) this.setElement(n.result(this, "el"), !1);
			else {
				var e = n.extend({}, n.result(this, "attributes"));
				this.id && (e.id = n.result(this, "id")), this.className && (e["class"] = n.result(this, "className"));
				var i = t.$("<" + n.result(this, "tagName") + ">").attr(e);
				this.setElement(i, !1)
			}
		}
	}), t.sync = function(e, i, r) {
		var s = j[e];
		n.defaults(r || (r = {}), {
			emulateHTTP: t.emulateHTTP,
			emulateJSON: t.emulateJSON
		});
		
		var o = {
			type: s,
			dataType: "json"
		};
		
		if (r.url || (o.url = n.result(i, "url") || F()), null != r.data || !i || "create" !== e && "update" !== e && "patch" !== e || (o.contentType = "application/json", o.data = JSON.stringify(r.attrs || i.toJSON(r))), r.emulateJSON && (o.contentType = "application/x-www-form-urlencoded", o.data = o.data ? {
			model: o.data
		} : {}), r.emulateHTTP && ("PUT" === s || "DELETE" === s || "PATCH" === s)) {
			o.type = "POST", r.emulateJSON && (o.data._method = s);
			var a = r.beforeSend;
			r.beforeSend = function(e) {
				if (e.setRequestHeader("X-HTTP-Method-Override", s), a) return a.apply(this, arguments)
			}
		}
		"GET" === o.type || r.emulateJSON || (o.processData = !1), "PATCH" === o.type && w && (o.xhr = function() {
			return new ActiveXObject("Microsoft.XMLHTTP")
		});
		
		var c = r.xhr = t.ajax(n.extend(o, r));
		return i.trigger("request", i, c, r), c
	};
	
	var w = !("undefined" == typeof window || !window.ActiveXObject || window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent),
		j = {
			create: "POST",
			update: "PUT",
			patch: "PATCH",
			"delete": "DELETE",
			read: "GET"
		};
	
	t.ajax = function() {
		return t.$.ajax.apply(t.$, arguments)
	};
	
	var x = t.Router = function(e) {
		e || (e = {}), e.routes && (this.routes = e.routes), this._bindRoutes(), this.initialize.apply(this, arguments)
	},
		C = /\((.*?)\)/g,
		k = /(\(\?)?:\w+/g,
		N = /\*\w+/g,
		T = /[\-{}\[\]+?.,\\\^$|#\s]/g;
	n.extend(x.prototype, a, {
		initialize: function() {},
		
		route: function(e, i, r) {
			n.isRegExp(e) || (e = this._routeToRegExp(e)), n.isFunction(i) && (r = i, i = ""), r || (r = this[i]);
			var s = this;
			return t.history.route(e, function(n) {
				var o = s._extractParameters(e, n);
				s.execute(r, o), s.trigger.apply(s, ["route:" + i].concat(o)), s.trigger("route", i, o), t.history.trigger("route", s, i, o)
			}), this
		},
		
		execute: function(e, t) {
			e && e.apply(this, t)
		},
		
		navigate: function(e, n) {
			return t.history.navigate(e, n), this
		},
		
		_bindRoutes: function() {
			if (this.routes) {
				this.routes = n.result(this, "routes");
				for (var e, t = n.keys(this.routes); null != (e = t.pop());) this.route(e, this.routes[e])
			}
		},
		
		_routeToRegExp: function(e) {
			return e = e.replace(T, "\\$&").replace(C, "(?:$1)?").replace(k, function(e, t) {
				return t ? e : "([^/?]+)"
			}).replace(N, "([^?]*?)"), new RegExp("^" + e + "(?:\\?([\\s\\S]*))?$")
		},
		
		_extractParameters: function(e, t) {
			var i = e.exec(t).slice(1);
			return n.map(i, function(e, t) {
				return t === i.length - 1 ? e || null : e ? decodeURIComponent(e) : null
			})
		}
	});
	
	var O = t.History = function() {
		this.handlers = [], n.bindAll(this, "checkUrl"), "undefined" != typeof window && (this.location = window.location, this.history = window.history)
	},
		S = /^[#\/]|\s+$/g,
		E = /^\/+|\/+$/g,
		A = /msie [\w.]+/,
		D = /\/$/,
		U = /#.*$/;
	O.started = !1, n.extend(O.prototype, a, {
		interval: 50,
		atRoot: function() {
			return this.location.pathname.replace(/[^\/]$/, "$&/") === this.root
		},
		
		getHash: function(e) {
			var t = (e || this).location.href.match(/#(.*)$/);
			return t ? t[1] : ""
		},
		
		getFragment: function(e, t) {
			if (null == e) if (this._hasPushState || !this._wantsHashChange || t) {
				e = decodeURI(this.location.pathname + this.location.search);
				var n = this.root.replace(D, "");
				e.indexOf(n) || (e = e.slice(n.length))
			} else e = this.getHash();
			
			return e.replace(S, "")
		},
		
		start: function(e) {
			if (O.started) throw new Error("Backbone.history has already been started");
			O.started = !0, this.options = n.extend({
				root: "/"
			}, this.options, e), this.root = this.options.root, this._wantsHashChange = this.options.hashChange !== !1, this._wantsPushState = !! this.options.pushState, this._hasPushState = !! (this.options.pushState && this.history && this.history.pushState);
			var i = this.getFragment(),
				r = document.documentMode,
				s = A.exec(navigator.userAgent.toLowerCase()) && (!r || r <= 7);
			if (this.root = ("/" + this.root + "/").replace(E, "/"), s && this._wantsHashChange) {
				var o = t.$('<iframe src="javascript:0" tabindex="-1">');
				this.iframe = o.hide().appendTo("body")[0].contentWindow, this.navigate(i)
			}
			this._hasPushState ? t.$(window).on("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !s ? t.$(window).on("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), this.fragment = i;
			var a = this.location;
			if (this._wantsHashChange && this._wantsPushState) {
				if (!this._hasPushState && !this.atRoot()) return this.fragment = this.getFragment(null, !0), this.location.replace(this.root + "#" + this.fragment), !0;
				this._hasPushState && this.atRoot() && a.hash && (this.fragment = this.getHash().replace(S, ""), this.history.replaceState({}, document.title, this.root + this.fragment))
			}
			if (!this.options.silent) return this.loadUrl()
		},
		
		stop: function() {
			t.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl), this._checkUrlInterval && clearInterval(this._checkUrlInterval), O.started = !1
		},
		
		route: function(e, t) {
			this.handlers.unshift({
				route: e,
				callback: t
			})
		},
		
		checkUrl: function(e) {
			var t = this.getFragment();
			
			return t === this.fragment && this.iframe && (t = this.getFragment(this.getHash(this.iframe))), t !== this.fragment && (this.iframe && this.navigate(t), void this.loadUrl())
		},
		
		loadUrl: function(e) {
			return e = this.fragment = this.getFragment(e), n.any(this.handlers, function(t) {
				if (t.route.test(e)) return t.callback(e), !0
			})
		},
		
		navigate: function(e, t) {
			if (!O.started) return !1;
			t && t !== !0 || (t = {
				trigger: !! t
			});
			
			var n = this.root + (e = this.getFragment(e || ""));
			if (e = e.replace(U, ""), this.fragment !== e) {
				if (this.fragment = e, "" === e && "/" !== n && (n = n.slice(0, -1)), this._hasPushState) this.history[t.replace ? "replaceState" : "pushState"]({}, document.title, n);
				else {
					if (!this._wantsHashChange) return this.location.assign(n);
					this._updateHash(this.location, e, t.replace), this.iframe && e !== this.getFragment(this.getHash(this.iframe)) && (t.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, e, t.replace))
				}
				return t.trigger ? this.loadUrl(e) : void 0
			}
		},
		
		_updateHash: function(e, t, n) {
			if (n) {
				var i = e.href.replace(/(javascript:|#).*$/, "");
				e.replace(i + "#" + t)
			} else e.hash = "#" + t
		}
	}), t.history = new O;
	var R = function(e, t) {
		var i, r = this;
		i = e && n.has(e, "constructor") ? e.constructor : function() {
			return r.apply(this, arguments)
		}, n.extend(i, r, t);
		var s = function() {
			this.constructor = i
		};
		
		return s.prototype = r.prototype, i.prototype = new s, e && n.extend(i.prototype, e), i.__super__ = r.prototype, i
	};
	
	p.extend = h.extend = x.extend = y.extend = O.extend = R;
	var F = function() {
		throw new Error('A "url" property or function must be specified')
	},
		P = function(e, t) {
			var n = t.error;
			t.error = function(i) {
				n && n(e, i, t), e.trigger("error", e, i, t)
			}
		};
	
	return t
}), function e(t, n, i) {
	function r(o, a) {
		if (!n[o]) {
			if (!t[o]) {
				var c = "function" == typeof require && require;
				if (!a && c) return c(o, !0);
				if (s) return s(o, !0);
				throw new Error("Cannot find module '" + o + "'")
			}
			var l = n[o] = {
				exports: {}
			};
			
			t[o][0].call(l.exports, function(e) {
				var n = t[o][1][e];
				return r(n ? n : e)
			}, l, l.exports, e, t, n, i)
		}
		return n[o].exports
	}
	for (var s = "function" == typeof require && require, o = 0; o < i.length; o++) r(i[o]);
	return r
}({
	1: [function(e, t, n) {
		var i = e("../lib/swig");
		"function" == typeof window.define && "object" == typeof window.define.amd ? window.define("swig", [], function() {
			return i
		}) : window.swig = i
	},
	{
		"../lib/swig": 9
	}],
	2: [function(e, t, n) {
		var i = e("./utils"),
			r = {
				full: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
				abbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
			},
			s = {
				full: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
				abbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
				alt: {
					"-1": "Yesterday",
					0: "Today",
					1: "Tomorrow"
				}
			};
		
		n.tzOffset = 0, n.DateZ = function() {
			var e = {
				"default": ["getUTCDate", "getUTCDay", "getUTCFullYear", "getUTCHours", "getUTCMilliseconds", "getUTCMinutes", "getUTCMonth", "getUTCSeconds", "toISOString", "toGMTString", "toUTCString", "valueOf", "getTime"],
				z: ["getDate", "getDay", "getFullYear", "getHours", "getMilliseconds", "getMinutes", "getMonth", "getSeconds", "getYear", "toDateString", "toLocaleDateString", "toLocaleTimeString"]
			},
				t = this;
			t.date = t.dateZ = arguments.length > 1 ? new Date(Date.UTC.apply(Date, arguments) + 6e4 * (new Date).getTimezoneOffset()) : 1 === arguments.length ? new Date(new Date(arguments[0])) : new Date, t.timezoneOffset = t.dateZ.getTimezoneOffset(), i.each(e.z, function(e) {
				t[e] = function() {
					return t.dateZ[e]()
				}
			}), i.each(e["default"], function(e) {
				t[e] = function() {
					return t.date[e]()
				}
			}), this.setTimezoneOffset(n.tzOffset)
		}, n.DateZ.prototype = {
			getTimezoneOffset: function() {
				return this.timezoneOffset
			},
			
			setTimezoneOffset: function(e) {
				return this.timezoneOffset = e, this.dateZ = new Date(this.date.getTime() + 6e4 * this.date.getTimezoneOffset() - 6e4 * this.timezoneOffset), this
			}
		}, n.d = function(e) {
			return (e.getDate() < 10 ? "0" : "") + e.getDate()
		}, n.D = function(e) {
			return s.abbr[e.getDay()]
		}, n.j = function(e) {
			return e.getDate()
		}, n.l = function(e) {
			return s.full[e.getDay()]
		}, n.N = function(e) {
			var t = e.getDay();
			
			return t >= 1 ? t : 7
		}, n.S = function(e) {
			var t = e.getDate();
			
			return t % 10 === 1 && 11 !== t ? "st" : t % 10 === 2 && 12 !== t ? "nd" : t % 10 === 3 && 13 !== t ? "rd" : "th"
		}, n.w = function(e) {
			return e.getDay()
		}, n.z = function(e, t, i) {
			var r = e.getFullYear(),
				s = new n.DateZ(r, e.getMonth(), e.getDate(), 12, 0, 0),
				o = new n.DateZ(r, 0, 1, 12, 0, 0);
			return s.setTimezoneOffset(t, i), o.setTimezoneOffset(t, i), Math.round((s - o) / 864e5)
		}, n.W = function(e) {
			var t, n = new Date(e.valueOf()),
				i = (e.getDay() + 6) % 7;
			return n.setDate(n.getDate() - i + 3), t = n.valueOf(), n.setMonth(0, 1), 4 !== n.getDay() && n.setMonth(0, 1 + (4 - n.getDay() + 7) % 7), 1 + Math.ceil((t - n) / 6048e5)
		}, n.F = function(e) {
			return r.full[e.getMonth()]
		}, n.m = function(e) {
			return (e.getMonth() < 9 ? "0" : "") + (e.getMonth() + 1)
		}, n.M = function(e) {
			return r.abbr[e.getMonth()]
		}, n.n = function(e) {
			return e.getMonth() + 1
		}, n.t = function(e) {
			return 32 - new Date(e.getFullYear(), e.getMonth(), 32).getDate()
		}, n.L = function(e) {
			return 29 === new Date(e.getFullYear(), 1, 29).getDate()
		}, n.o = function(e) {
			var t = new Date(e.valueOf());
			return t.setDate(t.getDate() - (e.getDay() + 6) % 7 + 3), t.getFullYear()
		}, n.Y = function(e) {
			return e.getFullYear()
		}, n.y = function(e) {
			return e.getFullYear().toString().substr(2)
		}, n.a = function(e) {
			return e.getHours() < 12 ? "am" : "pm"
		}, n.A = function(e) {
			return e.getHours() < 12 ? "AM" : "PM"
		}, n.B = function(e) {
			var t, n = e.getUTCHours();
			
			return n = 23 === n ? 0 : n + 1, t = Math.abs((60 * (60 * n + e.getUTCMinutes()) + e.getUTCSeconds()) / 86.4).toFixed(0), "000".concat(t).slice(t.length)
		}, n.g = function(e) {
			var t = e.getHours();
			
			return 0 === t ? 12 : t > 12 ? t - 12 : t
		}, n.G = function(e) {
			return e.getHours()
		}, n.h = function(e) {
			var t = e.getHours();
			
			return (t < 10 || 12 < t && 22 > t ? "0" : "") + (t < 12 ? t : t - 12)
		}, n.H = function(e) {
			var t = e.getHours();
			
			return (t < 10 ? "0" : "") + t
		}, n.i = function(e) {
			var t = e.getMinutes();
			
			return (t < 10 ? "0" : "") + t
		}, n.s = function(e) {
			var t = e.getSeconds();
			
			return (t < 10 ? "0" : "") + t
		}, n.O = function(e) {
			var t = e.getTimezoneOffset();
			
			return (t < 0 ? "-" : "+") + (t / 60 < 10 ? "0" : "") + Math.abs(t / 60) + "00"
		}, n.Z = function(e) {
			return 60 * e.getTimezoneOffset()
		}, n.c = function(e) {
			return e.toISOString()
		}, n.r = function(e) {
			return e.toUTCString()
		}, n.U = function(e) {
			return e.getTime() / 1e3
		}
	},
	{
		"./utils": 26
	}],
	3: [function(e, t, n) {
		function i(e) {
			var t = this,
				n = {};
			
			return r.isArray(e) ? r.map(e, function(e) {
				return t.apply(null, arguments)
			}) : "object" == typeof e ? (r.each(e, function(e, i) {
				n[i] = t.apply(null, arguments)
			}), n) : void 0
		}
		var r = e("./utils"),
			s = e("./dateformatter");
		n.addslashes = function(e) {
			var t = i.apply(n.addslashes, arguments);
			return void 0 !== t ? t : e.replace(/\\/g, "\\\\").replace(/\'/g, "\\'").replace(/\"/g, '\\"')
		}, n.capitalize = function(e) {
			var t = i.apply(n.capitalize, arguments);
			return void 0 !== t ? t : e.toString().charAt(0).toUpperCase() + e.toString().substr(1).toLowerCase()
		}, n.date = function(e, t, n, i) {
			var r, o = t.length,
				a = new s.DateZ(e),
				c = 0,
				l = "";
			for (n && a.setTimezoneOffset(n, i), c; c < o; c += 1) r = t.charAt(c), "\\" === r ? (c += 1, l += c < o ? t.charAt(c) : r) : l += s.hasOwnProperty(r) ? s[r](a, n, i) : r;
			return l
		}, n["default"] = function(e, t) {
			return "undefined" == typeof e || !e && "number" != typeof e ? t : e
		}, n.escape = function(e, t) {
			var r, s = i.apply(n.escape, arguments),
				o = e,
				a = 0;
			if (void 0 !== s) return s;
			if ("string" != typeof e) return e;
			switch (s = "", t) {
				case "js":
					for (o = o.replace(/\\/g, "\\u005C"), a; a < o.length; a += 1) r = o.charCodeAt(a), r < 32 ? (r = r.toString(16).toUpperCase(), r = r.length < 2 ? "0" + r : r, s += "\\u00" + r) : s += o[a];
					return s.replace(/&/g, "\\u0026").replace(/</g, "\\u003C").replace(/>/g, "\\u003E").replace(/\'/g, "\\u0027").replace(/"/g, "\\u0022").replace(/\=/g, "\\u003D").replace(/-/g, "\\u002D").replace(/;/g, "\\u003B");
				default:
					return o.replace(/&(?!amp;|lt;|gt;|quot;|#39;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
			}
		}, n.e = n.escape, n.first = function(e) {
			if ("object" == typeof e && !r.isArray(e)) {
				var t = r.keys(e);
				return e[t[0]]
			}
			return "string" == typeof e ? e.substr(0, 1) : e[0]
		}, n.groupBy = function(e, t) {
			if (!r.isArray(e)) return e;
			var n = {};
			
			return r.each(e, function(e) {
				if (e.hasOwnProperty(t)) {
					var i = e[t];
					r.extend({}, e);
					delete e[t], n[i] || (n[i] = []), n[i].push(e)
				}
			}), n
		}, n.join = function(e, t) {
			if (r.isArray(e)) return e.join(t);
			if ("object" == typeof e) {
				var n = [];
				return r.each(e, function(e) {
					n.push(e)
				}), n.join(t)
			}
			return e
		}, n.json = function(e, t) {
			return JSON.stringify(e, null, t || 0)
		}, n.json_encode = n.json, n.last = function(e) {
			if ("object" == typeof e && !r.isArray(e)) {
				var t = r.keys(e);
				return e[t[t.length - 1]]
			}
			return "string" == typeof e ? e.charAt(e.length - 1) : e[e.length - 1]
		}, n.lower = function(e) {
			var t = i.apply(n.lower, arguments);
			return void 0 !== t ? t : e.toString().toLowerCase()
		}, n.raw = function(e) {
			return n.safe(e)
		}, n.raw.safe = !0, n.replace = function(e, t, n, i) {
			var r = new RegExp(t, i);
			return e.replace(r, n)
		}, n.reverse = function(e) {
			return n.sort(e, !0)
		}, n.safe = function(e) {
			return e
		}, n.safe.safe = !0, n.sort = function(e, t) {
			var n;
			if (r.isArray(e)) n = e.sort();
			else
			switch (typeof e) {
				case "object":
					n = r.keys(e).sort();
					
					break;
				case "string":
					return n = e.split(""), t ? n.reverse().join("") : n.sort().join("")
			}
			return n && t ? n.reverse() : n || e
		}, n.striptags = function(e) {
			var t = i.apply(n.striptags, arguments);
			return void 0 !== t ? t : e.toString().replace(/(<([^>]+)>)/gi, "")
		}, n.title = function(e) {
			var t = i.apply(n.title, arguments);
			return void 0 !== t ? t : e.toString().replace(/\w\S*/g, function(e) {
				return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase()
			})
		}, n.uniq = function(e) {
			var t;
			return e && r.isArray(e) ? (t = [], r.each(e, function(e) {
				t.indexOf(e) === -1 && t.push(e)
			}), t) : ""
		}, n.upper = function(e) {
			var t = i.apply(n.upper, arguments);
			return void 0 !== t ? t : e.toString().toUpperCase()
		}, n.url_encode = function(e) {
			var t = i.apply(n.url_encode, arguments);
			return void 0 !== t ? t : encodeURIComponent(e)
		}, n.url_decode = function(e) {
			var t = i.apply(n.url_decode, arguments);
			return void 0 !== t ? t : decodeURIComponent(e)
		}
	},
	{
		"./dateformatter": 2,
		"./utils": 26
	}],
	4: [function(e, t, n) {
		function i(e) {
			var t;
			return r.some(o, function(n) {
				return r.some(n.regex, function(i) {
					var r, s = e.match(i);
					if (s) return r = s[n.idx || 0].replace(/\s*$/, ""), r = n.hasOwnProperty("replace") && n.replace.hasOwnProperty(r) ? n.replace[r] : r, t = {
						match: r,
						type: n.type,
						length: s[0].length
					}, !0
				})
			}), t || (t = {
				match: e,
				type: s.UNKNOWN,
				length: e.length
			}), t
		}
		var r = e("./utils"),
			s = {
				WHITESPACE: 0,
				STRING: 1,
				FILTER: 2,
				FILTEREMPTY: 3,
				FUNCTION: 4,
				FUNCTIONEMPTY: 5,
				PARENOPEN: 6,
				PARENCLOSE: 7,
				COMMA: 8,
				VAR: 9,
				NUMBER: 10,
				OPERATOR: 11,
				BRACKETOPEN: 12,
				BRACKETCLOSE: 13,
				DOTKEY: 14,
				ARRAYOPEN: 15,
				CURLYOPEN: 17,
				CURLYCLOSE: 18,
				COLON: 19,
				COMPARATOR: 20,
				LOGIC: 21,
				NOT: 22,
				BOOL: 23,
				ASSIGNMENT: 24,
				METHODOPEN: 25,
				UNKNOWN: 100
			},
			o = [{
				type: s.WHITESPACE,
				regex: [/^\s+/]
			},
			{
				type: s.STRING,
				regex: [/^""/, /^".*?[^\\]"/, /^''/, /^'.*?[^\\]'/]
			},
			{
				type: s.FILTER,
				regex: [/^\|\s*(\w+)\(/],
				idx: 1
			},
			{
				type: s.FILTEREMPTY,
				regex: [/^\|\s*(\w+)/],
				idx: 1
			},
			{
				type: s.FUNCTIONEMPTY,
				regex: [/^\s*(\w+)\(\)/],
				idx: 1
			},
			{
				type: s.FUNCTION,
				regex: [/^\s*(\w+)\(/],
				idx: 1
			},
			{
				type: s.PARENOPEN,
				regex: [/^\(/]
			},
			{
				type: s.PARENCLOSE,
				regex: [/^\)/]
			},
			{
				type: s.COMMA,
				regex: [/^,/]
			},
			{
				type: s.LOGIC,
				regex: [/^(&&|\|\|)\s*/, /^(and|or)\s+/],
				idx: 1,
				replace: {
					and: "&&",
					or: "||"
				}
			},
			{
				type: s.COMPARATOR,
				regex: [/^(===|==|\!==|\!=|<=|<|>=|>|in\s|gte\s|gt\s|lte\s|lt\s)\s*/],
				idx: 1,
				replace: {
					gte: ">=",
					gt: ">",
					lte: "<=",
					lt: "<"
				}
			},
			{
				type: s.ASSIGNMENT,
				regex: [/^(=|\+=|-=|\*=|\/=)/]
			},
			{
				type: s.NOT,
				regex: [/^\!\s*/, /^not\s+/],
				replace: {
					not: "!"
				}
			},
			{
				type: s.BOOL,
				regex: [/^(true|false)\s+/, /^(true|false)$/],
				idx: 1
			},
			{
				type: s.VAR,
				regex: [/^[a-zA-Z_$]\w*((\.\$?\w*)+)?/, /^[a-zA-Z_$]\w*/]
			},
			{
				type: s.BRACKETOPEN,
				regex: [/^\[/]
			},
			{
				type: s.BRACKETCLOSE,
				regex: [/^\]/]
			},
			{
				type: s.CURLYOPEN,
				regex: [/^\{/]
			},
			{
				type: s.COLON,
				regex: [/^\:/]
			},
			{
				type: s.CURLYCLOSE,
				regex: [/^\}/]
			},
			{
				type: s.DOTKEY,
				regex: [/^\.(\w+)/],
				idx: 1
			},
			{
				type: s.NUMBER,
				regex: [/^[+\-]?\d+(\.\d+)?/]
			},
			{
				type: s.OPERATOR,
				regex: [/^(\+|\-|\/|\*|%)/]
			}];
		n.types = s, n.read = function(e) {
			for (var t, n, r = 0, s = []; r < e.length;) t = e.substring(r), n = i(t), r += n.length, s.push(n);
			return s
		}
	},
	{
		"./utils": 26
	}],
	5: [function(e, t, n) {
		var i = e("__browserify_process"),
			r = e("fs"),
			s = e("path");
		t.exports = function(e, t) {
			var n = {};
			
			return t = t || "utf8", e = e ? s.normalize(e) : null, n.resolve = function(t, n) {
				return n = e ? e : n ? s.dirname(n) : i.cwd(), s.resolve(n, t)
			}, n.load = function(e, i) {
				if (!r || i && !r.readFile || !r.readFileSync) throw new Error("Unable to find file " + e + " because there is no filesystem to read from.");
				return e = n.resolve(e), i ? void r.readFile(e, t, i) : r.readFileSync(e, t)
			}, n
		}
	},
	{
		__browserify_process: 31,
		fs: 28,
		path: 29
	}],
	6: [function(e, t, n) {
		n.fs = e("./filesystem"), n.memory = e("./memory")
	},
	{
		"./filesystem": 5,
		"./memory": 7
	}],
	7: [function(e, t, n) {
		var i = e("path"),
			r = e("../utils");
		t.exports = function(e, t) {
			var n = {};
			
			return t = t ? i.normalize(t) : null, n.resolve = function(e, n) {
				return n = t ? t : n ? i.dirname(n) : "/", i.resolve(n, e)
			}, n.load = function(t, n) {
				var i, s;
				return s = [t, t.replace(/^(\/|\\)/, "")], i = e[s[0]] || e[s[1]], i || r.throwError('Unable to find template "' + t + '".'), n ? void n(null, i) : i
			}, n
		}
	},
	{
		"../utils": 26,
		path: 29
	}],
	8: [function(e, t, n) {
		function i(e) {
			return e.replace(/[\-\/\\\^$*+?.()|\[\]{}]/g, "\\$&")
		}
		function r(e, t, n, i, r) {
			this.out = [], this.state = [], this.filterApplyIdx = [], this._parsers = {}, this.line = i, this.filename = r, this.filters = t, this.escape = n, this.parse = function() {
				var t = this;
				return t._parsers.start && t._parsers.start.call(t), s.each(e, function(n, i) {
					var r = e[i - 1];
					if (t.isLast = i === e.length - 1, r) for (; r.type === a.WHITESPACE;) i -= 1, r = e[i - 1];
					t.prevToken = r, t.parseToken(n)
				}), t._parsers.end && t._parsers.end.call(t), t.escape && (t.filterApplyIdx = [0], "string" == typeof t.escape ? (t.parseToken({
					type: a.FILTER,
					match: "e"
				}), t.parseToken({
					type: a.COMMA,
					match: ","
				}), t.parseToken({
					type: a.STRING,
					match: String(n)
				}), t.parseToken({
					type: a.PARENCLOSE,
					match: ")"
				})) : t.parseToken({
					type: a.FILTEREMPTY,
					match: "e"
				})), t.out
			}
		}
		var s = e("./utils"),
			o = e("./lexer"),
			a = o.types,
			c = ["break", "case", "catch", "continue", "debugger", "default", "delete", "do", "else", "finally", "for", "function", "if", "in", "instanceof", "new", "return", "switch", "this", "throw", "try", "typeof", "var", "void", "while", "with"];
		r.prototype = {
			on: function(e, t) {
				this._parsers[e] = t
			},
			
			parseToken: function(e) {
				var t, n = this,
					i = n._parsers[e.type] || n._parsers["*"],
					r = e.match,
					o = n.prevToken,
					c = o ? o.type : null,
					l = n.state.length ? n.state[n.state.length - 1] : null;
				if (!i || "function" != typeof i || i.call(this, e)) switch (l && o && l === a.FILTER && c === a.FILTER && e.type !== a.PARENCLOSE && e.type !== a.COMMA && e.type !== a.OPERATOR && e.type !== a.FILTER && e.type !== a.FILTEREMPTY && n.out.push(", "), l && l === a.METHODOPEN && (n.state.pop(), e.type !== a.PARENCLOSE && n.out.push(", ")), e.type) {
					case a.WHITESPACE:
						break;
					case a.STRING:
						n.filterApplyIdx.push(n.out.length), n.out.push(r.replace(/\\/g, "\\\\"));
						break;
					case a.NUMBER:
					case a.BOOL:
						n.filterApplyIdx.push(n.out.length), n.out.push(r);
						break;
					case a.FILTER:
						n.filters.hasOwnProperty(r) && "function" == typeof n.filters[r] || s.throwError('Invalid filter "' + r + '"', n.line, n.filename), n.escape = !n.filters[r].safe && n.escape, n.out.splice(n.filterApplyIdx[n.filterApplyIdx.length - 1], 0, '_filters["' + r + '"]('), n.state.push(e.type);
						break;
					case a.FILTEREMPTY:
						n.filters.hasOwnProperty(r) && "function" == typeof n.filters[r] || s.throwError('Invalid filter "' + r + '"', n.line, n.filename), n.escape = !n.filters[r].safe && n.escape, n.out.splice(n.filterApplyIdx[n.filterApplyIdx.length - 1], 0, '_filters["' + r + '"]('), n.out.push(")");
						break;
					case a.FUNCTION:
					case a.FUNCTIONEMPTY:
						n.out.push("((typeof _ctx." + r + ' !== "undefined") ? _ctx.' + r + " : ((typeof " + r + ' !== "undefined") ? ' + r + " : _fn))("), n.escape = !1, e.type === a.FUNCTIONEMPTY ? n.out[n.out.length - 1] = n.out[n.out.length - 1] + ")" : n.state.push(e.type), n.filterApplyIdx.push(n.out.length - 1);
						break;
					case a.PARENOPEN:
						n.state.push(e.type), n.filterApplyIdx.length ? (n.out.splice(n.filterApplyIdx[n.filterApplyIdx.length - 1], 0, "("), o && c === a.VAR ? (t = o.match.split(".").slice(0, -1), n.out.push(" || _fn).call(" + n.checkMatch(t)), n.state.push(a.METHODOPEN), n.escape = !1) : n.out.push(" || _fn)("), n.filterApplyIdx.push(n.out.length - 3)) : (n.out.push("("), n.filterApplyIdx.push(n.out.length - 1));
						break;
					case a.PARENCLOSE:
						t = n.state.pop(), t !== a.PARENOPEN && t !== a.FUNCTION && t !== a.FILTER && s.throwError("Mismatched nesting state", n.line, n.filename), n.out.push(")"), n.filterApplyIdx.pop(), t !== a.FILTER && n.filterApplyIdx.pop();
						
						break;
					case a.COMMA:
						l !== a.FUNCTION && l !== a.FILTER && l !== a.ARRAYOPEN && l !== a.CURLYOPEN && l !== a.PARENOPEN && l !== a.COLON && s.throwError("Unexpected comma", n.line, n.filename), l === a.COLON && n.state.pop(), n.out.push(", "), n.filterApplyIdx.pop();
						
						break;
					case a.LOGIC:
					case a.COMPARATOR:
						o && c !== a.COMMA && c !== e.type && c !== a.BRACKETOPEN && c !== a.CURLYOPEN && c !== a.PARENOPEN && c !== a.FUNCTION || s.throwError("Unexpected logic", n.line, n.filename), n.out.push(e.match);
						break;
					case a.NOT:
						n.out.push(e.match);
						break;
					case a.VAR:
						n.parseVar(e, r, l);
						break;
					case a.BRACKETOPEN:
						!o || c !== a.VAR && c !== a.BRACKETCLOSE && c !== a.PARENCLOSE ? (n.state.push(a.ARRAYOPEN), n.filterApplyIdx.push(n.out.length)) : n.state.push(e.type), n.out.push("[");
						break;
					case a.BRACKETCLOSE:
						t = n.state.pop(), t !== a.BRACKETOPEN && t !== a.ARRAYOPEN && s.throwError("Unexpected closing square bracket", n.line, n.filename), n.out.push("]"), n.filterApplyIdx.pop();
						
						break;
					case a.CURLYOPEN:
						n.state.push(e.type), n.out.push("{"), n.filterApplyIdx.push(n.out.length - 1);
						break;
					case a.COLON:
						l !== a.CURLYOPEN && s.throwError("Unexpected colon", n.line, n.filename), n.state.push(e.type), n.out.push(":"), n.filterApplyIdx.pop();
						
						break;
					case a.CURLYCLOSE:
						l === a.COLON && n.state.pop(), n.state.pop() !== a.CURLYOPEN && s.throwError("Unexpected closing curly brace", n.line, n.filename), n.out.push("}"), n.filterApplyIdx.pop();
						
						break;
					case a.DOTKEY:
						(!o || c !== a.VAR && c !== a.BRACKETCLOSE && c !== a.DOTKEY && c !== a.PARENCLOSE && c !== a.FUNCTIONEMPTY && c !== a.FILTEREMPTY && c !== a.CURLYCLOSE) && s.throwError('Unexpected key "' + r + '"', n.line, n.filename), n.out.push("." + r);
						break;
					case a.OPERATOR:
						n.out.push(" " + r + " "), n.filterApplyIdx.pop()
				}
			},
			
			parseVar: function(e, t, n) {
				var i = this;
				return t = t.split("."), c.indexOf(t[0]) !== -1 && s.throwError('Reserved keyword "' + t[0] + '" attempted to be used as a variable', i.line, i.filename), i.filterApplyIdx.push(i.out.length), n === a.CURLYOPEN ? (t.length > 1 && s.throwError("Unexpected dot", i.line, i.filename), void i.out.push(t[0])) : void i.out.push(i.checkMatch(t))
			},
			
			checkMatch: function(e) {
				function t(t) {
					var n = t + r,
						i = e,
						o = "";
					return o = "(typeof " + n + ' !== "undefined" && ' + n + " !== null", s.each(i, function(e, t) {
						0 !== t && (o += " && " + n + "." + e + " !== undefined && " + n + "." + e + " !== null", n += "." + e)
					}), o += ")"
				}
				function n(n) {
					return "(" + t(n) + " ? " + n + e.join(".") + ' : "")'
				}
				var i, r = e[0];
				return i = "(" + t("_ctx.") + " ? " + n("_ctx.") + " : " + n("") + ")", "(" + i + " !== null ? " + i + ' : "" )'
			}
		}, n.parse = function(e, t, c, l, u) {
			function d(e, t) {
				var n, i, a = o.read(s.strip(e));
				return n = new r(a, u, m, t, c.filename), i = n.parse().join(""), n.state.length && s.throwError('Unable to parse "' + e + '"', t, c.filename), {
					compile: function() {
						return "_output += " + i + ";\n"
					}
				}
			}
			function p(t, n) {
				var i, d, p, f, h, g, _;
				if (s.startsWith(t, "end")) {
					if (_ = R[R.length - 1], _ && _.name === t.split(/\s+/)[0].replace(/^end/, "") && _.ends) {
						switch (_.name) {
							case "autoescape":
								m = c.autoescape;
								break;
							case "raw":
								I = !1
						}
						return void R.pop()
					}
					I || s.throwError('Unexpected end of tag "' + t.replace(/^end/, "") + '"', n, c.filename)
				}
				if (!I) {
					switch (p = t.split(/\s+(.+)?/), f = p.shift(), l.hasOwnProperty(f) || s.throwError('Unexpected tag "' + t + '"', n, c.filename), i = o.read(s.strip(p.join(" "))), d = new r(i, u, (!1), n, c.filename), h = l[f], h.parse(p[1], n, d, a, R, c, e) || s.throwError('Unexpected tag "' + f + '"', n, c.filename), d.parse(), g = d.out, f) {
						case "autoescape":
							m = "false" !== g[0] && g[0];
							break;
						case "raw":
							I = !0
					}
					return {
						block: !! l[f].block,
						compile: h.compile,
						args: g,
						content: [],
						ends: h.ends,
						name: f
					}
				}
			}
			function f(e) {
				return "string" == typeof e && (e = e.replace(/\s*$/, "")), e
			}
			t = t.replace(/\r\n/g, "\n");
			var h, m = c.autoescape,
				g = c.tagControls[0],
				_ = c.tagControls[1],
				v = c.varControls[0],
				y = c.varControls[1],
				b = i(g),
				$ = i(_),
				w = i(v),
				j = i(y),
				x = new RegExp("^" + b + "-?\\s*-?|-?\\s*-?" + $ + "$", "g"),
				C = new RegExp("^" + b + "-"),
				k = new RegExp("-" + $ + "$"),
				N = new RegExp("^" + w + "-?\\s*-?|-?\\s*-?" + j + "$", "g"),
				T = new RegExp("^" + w + "-"),
				O = new RegExp("-" + j + "$"),
				S = c.cmtControls[0],
				E = c.cmtControls[1],
				A = "[\\s\\S]*?",
				D = new RegExp("(" + b + A + $ + "|" + w + A + j + "|" + i(S) + A + i(E) + ")"),
				U = 1,
				R = [],
				F = null,
				P = [],
				M = {},
				I = !1;
			return n.parseVariable = d, s.each(t.split(D), function(e) {
				var t, n, i, r, o;
				if (e) {
					if (!I && s.startsWith(e, v) && s.endsWith(e, y)) i = T.test(e), h = O.test(e), t = d(e.replace(N, ""), U);
					else if (s.startsWith(e, g) && s.endsWith(e, _)) i = C.test(e), h = k.test(e), t = p(e.replace(x, ""), U), t && ("extends" === t.name ? F = t.args.join("").replace(/^\'|\'$/g, "").replace(/^\"|\"$/g, "") : t.block && !R.length && (M[t.args.join("")] = t)), I && !t && (t = e);
					else if (I || !s.startsWith(e, S) && !s.endsWith(e, E)) t = h ? e.replace(/^\s*/, "") : e, h = !1;
					else if (s.startsWith(e, S) && s.endsWith(e, E)) return;
					i && P.length && (r = P.pop(), "string" == typeof r ? r = f(r) : r.content && r.content.length && (o = f(r.content.pop()), r.content.push(o)), P.push(r)), t && (R.length ? R[R.length - 1].content.push(t) : P.push(t), t.name && t.ends && R.push(t), n = e.match(/\n/g), U += n ? n.length : 0)
				}
			}), {
				name: c.filename,
				parent: F,
				tokens: P,
				blocks: M
			}
		}, n.compile = function(e, t, i, r) {
			var o = "",
				a = s.isArray(e) ? e : e.tokens;
			return s.each(a, function(e) {
				var s;
				return "string" == typeof e ? void(o += '_output += "' + e.replace(/\\/g, "\\\\").replace(/\n|\r/g, "\\n").replace(/"/g, '\\"') + '";\n') : (s = e.compile(n.compile, e.args ? e.args.slice(0) : [], e.content ? e.content.slice(0) : [], t, i, r), void(o += s || ""))
			}), o
		}
	},
	{
		"./lexer": 4,
		"./utils": 26
	}],
	9: [function(e, t, n) {
		function i() {
			return ""
		}
		function r(e) {
			if (e) {
				if (s.each(["varControls", "tagControls", "cmtControls"], function(t) {
					if (e.hasOwnProperty(t)) {
						if (!s.isArray(e[t]) || 2 !== e[t].length) throw new Error('Option "' + t + '" must be an array containing 2 different control strings.');
						if (e[t][0] === e[t][1]) throw new Error('Option "' + t + '" open and close controls must not be the same.');
						s.each(e[t], function(e, n) {
							if (e.length < 2) throw new Error('Option "' + t + '" ' + (n ? "open " : "close ") + 'control must be at least 2 characters. Saw "' + e + '" instead.')
						})
					}
				}), e.hasOwnProperty("cache") && e.cache && "memory" !== e.cache && (!e.cache.get || !e.cache.set)) throw new Error("Invalid cache option " + JSON.stringify(e.cache) + ' found. Expected "memory" or { get: function (key) { ... }, set: function (key, value) { ... } }.');
				if (e.hasOwnProperty("loader") && e.loader && (!e.loader.load || !e.loader.resolve)) throw new Error("Invalid loader option " + JSON.stringify(e.loader) + " found. Expected { load: function (pathname, cb) { ... }, resolve: function (to, from) { ... } }.")
			}
		}
		var s = e("./utils"),
			o = e("./tags"),
			a = e("./filters"),
			c = e("./parser"),
			l = e("./dateformatter"),
			u = e("./loaders");
		n.version = "1.4.2";
		var d, p = {
			autoescape: !0,
			varControls: ["{{", "}}"],
			tagControls: ["{%", "%}"],
			cmtControls: ["{#", "#}"],
			locals: {},
			
			cache: "memory",
			loader: u.fs()
		};
		
		n.setDefaults = function(e) {
			r(e), d.options = s.extend(d.options, e)
		}, n.setDefaultTZOffset = function(e) {
			l.tzOffset = e
		}, n.Swig = function(e) {
			function t(e) {
				return e && e.locals ? s.extend({}, m.options.locals, e.locals) : m.options.locals
			}
			function n(e) {
				return e = e || {}, e.hasOwnProperty("cache") && !e.cache || !m.options.cache
			}
			function l(e, t) {
				if (!n(t)) return "memory" === m.options.cache ? m.cache[e] : m.options.cache.get(e)
			}
			function u(e, t, i) {
				if (!n(t)) return "memory" === m.options.cache ? void(m.cache[e] = i) : void m.options.cache.set(e, i)
			}
			function d(e, t) {
				return s.map(t, function(t) {
					var n = t.args ? t.args.join("") : "";
					return "block" === t.name && e[n] && (t = e[n]), t.content && t.content.length && (t.content = d(e, t.content)), t
				})
			}
			function f(e, t) {
				var n = [];
				s.each(e, function(e) {
					n.push(e)
				}), s.each(n.reverse(), function(e) {
					"block" !== e.name && t.unshift(e)
				})
			}
			function h(e, t) {
				for (var n, i, r, o = e.parent, a = [], c = []; o;) {
					if (!t || !t.filename) throw new Error('Cannot extend "' + o + '" because current template has no filename.');
					if (n = n || t.filename, n = m.options.loader.resolve(o, n), i = l(n, t) || m.parseFile(n, s.extend({}, t, {
						filename: n
					})), o = i.parent, a.indexOf(n) !== -1) throw new Error('Illegal circular extends of "' + n + '".');
					a.push(n), c.push(i)
				}
				for (r = c.length, r = c.length - 2; r >= 0; r -= 1) c[r].tokens = d(c[r].blocks, c[r + 1].tokens), f(c[r].blocks, c[r].tokens);
				return c
			}
			r(e), this.options = s.extend({}, p, e || {}), this.cache = {}, this.extensions = {};
			
			var m = this,
				g = o,
				_ = a;
			this.invalidateCache = function() {
				"memory" === m.options.cache && (m.cache = {})
			}, this.setFilter = function(e, t) {
				if ("function" != typeof t) throw new Error('Filter "' + e + '" is not a valid function.');
				_[e] = t
			}, this.setTag = function(e, t, n, i, r) {
				if ("function" != typeof t) throw new Error('Tag "' + e + '" parse method is not a valid function.');
				if ("function" != typeof n) throw new Error('Tag "' + e + '" compile method is not a valid function.');
				g[e] = {
					parse: t,
					compile: n,
					ends: i || !1,
					block: !! r
				}
			}, this.setExtension = function(e, t) {
				m.extensions[e] = t
			}, this.parse = function(e, n) {
				r(n);
				var i, o = t(n),
					a = {};
				
				for (i in n) n.hasOwnProperty(i) && "locals" !== i && (a[i] = n[i]);
				return n = s.extend({}, m.options, a), n.locals = o, c.parse(this, e, n, g, _)
			}, this.parseFile = function(e, t) {
				var n;
				return t || (t = {}), e = m.options.loader.resolve(e, t.resolveFrom), n = m.options.loader.load(e), t.filename || (t = s.extend({
					filename: e
				}, t)), m.parse(n, t)
			}, this.precompile = function(e, t) {
				var n, i = m.parse(e, t),
					r = h(i, t);
				r.length && (i.tokens = d(i.blocks, r[0].tokens), f(i.blocks, i.tokens));
				try {
					n = new Function("_swig", "_ctx", "_filters", "_utils", "_fn", '  var _ext = _swig.extensions,\n    _output = "";\n' + c.compile(i, r, t) + "\n  return _output;\n")
				} catch (o) {
					s.throwError(o, null, t.filename)
				}
				return {
					tpl: n,
					tokens: i
				}
			}, this.render = function(e, t) {
				return m.compile(e, t)()
			}, this.renderFile = function(e, t, n) {
				return n ? void m.compileFile(e, {}, function(e, i) {
					var r;
					if (e) return void n(e);
					try {
						r = i(t)
					} catch (s) {
						return void n(s)
					}
					n(null, r)
				}) : m.compileFile(e)(t)
			}, this.compile = function(e, n) {
				function r(e) {
					var t;
					return t = e && a ? s.extend({}, o, e) : e && !a ? e : !e && a ? o : {}, c.tpl(m, t, _, s, i)
				}
				var o, a, c, d = n ? n.filename : null,
					p = d ? l(d, n) : null;
				return p ? p : (o = t(n), a = s.keys(o).length, c = this.precompile(e, n), s.extend(r, c.tokens), d && u(d, n, r), r)
			}, this.compileFile = function(e, t, n) {
				var i, r;
				return t || (t = {}), e = m.options.loader.resolve(e, t.resolveFrom), t.filename || (t = s.extend({
					filename: e
				}, t)), (r = l(e, t)) ? n ? void n(null, r) : r : n ? void m.options.loader.load(e, function(e, i) {
					if (e) return void n(e);
					var r;
					try {
						r = m.compile(i, t)
					} catch (s) {
						return void n(s)
					}
					n(e, r)
				}) : (i = m.options.loader.load(e), m.compile(i, t))
			}, this.run = function(e, n, r) {
				var o = t({
					locals: n
				});
				
				return r && u(r, {}, e), e(m, o, _, s, i)
			}
		}, d = new n.Swig, n.setFilter = d.setFilter, n.setTag = d.setTag, n.setExtension = d.setExtension, n.parseFile = d.parseFile, n.precompile = d.precompile, n.compile = d.compile, n.compileFile = d.compileFile, n.render = d.render, n.renderFile = d.renderFile, n.run = d.run, n.invalidateCache = d.invalidateCache, n.loaders = u
	},
	{
		"./dateformatter": 2,
		"./filters": 3,
		"./loaders": 6,
		"./parser": 8,
		"./tags": 20,
		"./utils": 26
	}],
	10: [function(e, t, n) {
		var i = e("../utils"),
			r = ["html", "js"];
		n.compile = function(e, t, n, i, r, s) {
			return e(n, i, r, s)
		}, n.parse = function(e, t, n, s, o, a) {
			var c;
			return n.on("*", function(e) {
				return c || e.type !== s.BOOL && (e.type !== s.STRING || r.indexOf(e.match) !== -1) ? void i.throwError('Unexpected token "' + e.match + '" in autoescape tag', t, a.filename) : (this.out.push(e.match), void(c = !0))
			}), !0
		}, n.ends = !0
	},
	{
		"../utils": 26
	}],
	11: [function(e, t, n) {
		n.compile = function(e, t, n, i, r) {
			return e(n, i, r, t.join(""))
		}, n.parse = function(e, t, n) {
			return n.on("*", function(e) {
				this.out.push(e.match)
			}), !0
		}, n.ends = !0, n.block = !0
	},
	{}],
	12: [function(e, t, n) {
		n.compile = function() {
			return "} else {\n"
		}, n.parse = function(e, t, n, i, r) {
			return n.on("*", function(e) {
				throw new Error('"else" tag does not accept any tokens. Found "' + e.match + '" on line ' + t + ".")
			}), r.length && "if" === r[r.length - 1].name
		}
	},
	{}],
	13: [function(e, t, n) {
		var i = e("./if").parse;
		n.compile = function(e, t) {
			return "} else if (" + t.join(" ") + ") {\n"
		}, n.parse = function(e, t, n, r, s) {
			var o = i(e, t, n, r, s);
			return o && s.length && "if" === s[s.length - 1].name
		}
	},
	{
		"./if": 17
	}],
	14: [function(e, t, n) {
		n.compile = function() {}, n.parse = function() {
			return !0
		}, n.ends = !1
	},
	{}],
	15: [function(e, t, n) {
		var i = e("../filters");
		n.compile = function(e, t, n, i, r, s) {
			var o = t.shift().replace(/\($/, ""),
				a = '(function () {\n  var _output = "";\n' + e(n, i, r, s) + "  return _output;\n})()";
			return ")" === t[t.length - 1] && t.pop(), t = t.length ? ", " + t.join("") : "", '_output += _filters["' + o + '"](' + a + t + ");\n"
		}, n.parse = function(e, t, n, r) {
			function s(e) {
				if (!i.hasOwnProperty(e)) throw new Error('Filter "' + e + '" does not exist on line ' + t + ".")
			}
			var o;
			return n.on(r.FUNCTION, function(e) {
				return !!o || (o = e.match.replace(/\($/, ""), s(o), this.out.push(e.match), void this.state.push(e.type))
			}), n.on(r.VAR, function(e) {
				return !!o || (o = e.match, s(o), void this.out.push(o))
			}), !0
		}, n.ends = !0
	},
	{
		"../filters": 3
	}],
	16: [function(e, t, n) {
		var i = "_ctx.",
			r = i + "loop";
		n.compile = function(e, t, n, s, o, a) {
			var c, l = t.shift(),
				u = "__k",
				d = (i + "__loopcache" + Math.random()).replace(/\./g, "");
			return t[0] && "," === t[0] && (t.shift(), u = l, l = t.shift()), c = t.join(""), ["(function () {\n", "  var __l = " + c + ', __len = (_utils.isArray(__l) || typeof __l === "string") ? __l.length : _utils.keys(__l).length;\n', "  if (!__l) { return; }\n", "    var " + d + " = { loop: " + r + ", " + l + ": " + i + l + ", " + u + ": " + i + u + " };\n", "    " + r + " = { first: false, index: 1, index0: 0, revindex: __len, revindex0: __len - 1, length: __len, last: false };\n", "  _utils.each(__l, function (" + l + ", " + u + ") {\n", "    " + i + l + " = " + l + ";\n", "    " + i + u + " = " + u + ";\n", "    " + r + ".key = " + u + ";\n", "    " + r + ".first = (" + r + ".index0 === 0);\n", "    " + r + ".last = (" + r + ".revindex0 === 0);\n", "    " + e(n, s, o, a), "    " + r + ".index += 1; " + r + ".index0 += 1; " + r + ".revindex -= 1; " + r + ".revindex0 -= 1;\n", "  });\n", "  " + r + " = " + d + ".loop;\n", "  " + i + l + " = " + d + "." + l + ";\n", "  " + i + u + " = " + d + "." + u + ";\n", "  " + d + " = undefined;\n", "})();\n"].join("")
		}, n.parse = function(e, t, n, i) {
			var r, s;
			return n.on(i.NUMBER, function(e) {
				var n = this.state.length ? this.state[this.state.length - 1] : null;
				if (!s || n !== i.ARRAYOPEN && n !== i.CURLYOPEN && n !== i.CURLYCLOSE && n !== i.FUNCTION && n !== i.FILTER) throw new Error('Unexpected number "' + e.match + '" on line ' + t + ".");
				return !0
			}), n.on(i.VAR, function(e) {
				return !(!s || !r) || (this.out.length || (r = !0), void this.out.push(e.match))
			}), n.on(i.COMMA, function(e) {
				return !r || this.prevToken.type !== i.VAR || void this.out.push(e.match)
			}), n.on(i.COMPARATOR, function(e) {
				if ("in" !== e.match || !r) throw new Error('Unexpected token "' + e.match + '" on line ' + t + ".");
				s = !0, this.filterApplyIdx.push(this.out.length)
			}), !0
		}, n.ends = !0
	},
	{}],
	17: [function(e, t, n) {
		n.compile = function(e, t, n, i, r, s) {
			return "if (" + t.join(" ") + ") { \n" + e(n, i, r, s) + "\n}"
		}, n.parse = function(e, t, n, i) {
			if ("undefined" == typeof e) throw new Error("No conditional statement provided on line " + t + ".");
			return n.on(i.COMPARATOR, function(e) {
				if (this.isLast) throw new Error('Unexpected logic "' + e.match + '" on line ' + t + ".");
				if (this.prevToken.type === i.NOT) throw new Error('Attempted logic "not ' + e.match + '" on line ' + t + ". Use !(foo " + e.match + ") instead.");
				this.out.push(e.match), this.filterApplyIdx.push(this.out.length)
			}), n.on(i.NOT, function(e) {
				if (this.isLast) throw new Error('Unexpected logic "' + e.match + '" on line ' + t + ".");
				this.out.push(e.match)
			}), n.on(i.BOOL, function(e) {
				this.out.push(e.match)
			}), n.on(i.LOGIC, function(e) {
				if (!this.out.length || this.isLast) throw new Error('Unexpected logic "' + e.match + '" on line ' + t + ".");
				this.out.push(e.match), this.filterApplyIdx.pop()
			}), !0
		}, n.ends = !0
	},
	{}],
	18: [function(e, t, n) {
		var i = e("../utils");
		n.compile = function(e, t) {
			var n = t.pop(),
				r = "_ctx." + n + ' = {};\n  var _output = "";\n',
				s = i.map(t, function(e) {
					return {
						ex: new RegExp("_ctx." + e.name, "g"),
						re: "_ctx." + n + "." + e.name
					}
				});
			
			return i.each(t, function(e) {
				var t = e.compiled;
				i.each(s, function(e) {
					t = t.replace(e.ex, e.re)
				}), r += t
			}), r
		}, n.parse = function(t, n, r, s, o, a, c) {
			var l, u, d = e("../parser").compile,
				p = {
					resolveFrom: a.filename
				},
				f = i.extend({}, a, p);
			return r.on(s.STRING, function(e) {
				var t = this;
				if (!l) return l = c.parseFile(e.match.replace(/^("|')|("|')$/g, ""), p).tokens, void i.each(l, function(e) {
					var n, i = "";
					e && "macro" === e.name && e.compile && (n = e.args[0], i += e.compile(d, e.args, e.content, [], f) + "\n", t.out.push({
						compiled: i,
						name: n
					}))
				});
				
				throw new Error("Unexpected string " + e.match + " on line " + n + ".")
			}), r.on(s.VAR, function(e) {
				var t = this;
				if (!l || u) throw new Error('Unexpected variable "' + e.match + '" on line ' + n + ".");
				if ("as" !== e.match) return u = e.match, t.out.push(u), !1
			}), !0
		}, n.block = !0
	},
	{
		"../parser": 8,
		"../utils": 26
	}],
	19: [function(e, t, n) {
		var i = "ignore",
			r = "missing",
			s = "only";
		n.compile = function(e, t) {
			var n = t.shift(),
				i = t.indexOf(s),
				o = i !== -1 && t.splice(i, 1),
				a = (t.pop() || "").replace(/\\/g, "\\\\"),
				c = t[t.length - 1] === r && t.pop(),
				l = t.join("");
			return (c ? "  try {\n" : "") + "_output += _swig.compileFile(" + n + ', {resolveFrom: "' + a + '"})(' + (o && l ? l : l ? "_utils.extend({}, _ctx, " + l + ")" : "_ctx") + ");\n" + (c ? "} catch (e) {}\n" : "")
		}, n.parse = function(e, t, n, o, a, c) {
			var l, u;
			return n.on(o.STRING, function(e) {
				return !!l || (l = e.match, void this.out.push(l))
			}), n.on(o.VAR, function(e) {
				if (!l) return l = e.match, !0;
				if (!u && "with" === e.match) return void(u = !0);
				if (u && e.match === s && "with" !== this.prevToken.match) return void this.out.push(e.match);
				if (e.match === i) return !1;
				if (e.match === r) {
					if (this.prevToken.match !== i) throw new Error('Unexpected token "' + r + '" on line ' + t + ".");
					return this.out.push(e.match), !1
				}
				if (this.prevToken.match === i) throw new Error('Expected "' + r + '" on line ' + t + ' but found "' + e.match + '".');
				return !0
			}), n.on("end", function() {
				this.out.push(c.filename || null)
			}), !0
		}
	},
	{}],
	20: [function(e, t, n) {
		n.autoescape = e("./autoescape"), n.block = e("./block"), n["else"] = e("./else"), n.elseif = e("./elseif"), n.elif = n.elseif, n["extends"] = e("./extends"), n.filter = e("./filter"), n["for"] = e("./for"), n["if"] = e("./if"), n["import"] = e("./import"), n.include = e("./include"), n.macro = e("./macro"), n.parent = e("./parent"), n.raw = e("./raw"), n.set = e("./set"), n.spaceless = e("./spaceless")
	},
	{
		"./autoescape": 10,
		"./block": 11,
		"./else": 12,
		"./elseif": 13,
		"./extends": 14,
		"./filter": 15,
		"./for": 16,
		"./if": 17,
		"./import": 18,
		"./include": 19,
		"./macro": 21,
		"./parent": 22,
		"./raw": 23,
		"./set": 24,
		"./spaceless": 25
	}],
	21: [function(e, t, n) {
		n.compile = function(e, t, n, i, r, s) {
			var o = t.shift();
			
			return "_ctx." + o + " = function (" + t.join("") + ') {\n  var _output = "",\n    __ctx = _utils.extend({}, _ctx);\n  _utils.each(_ctx, function (v, k) {\n    if (["' + t.join('","') + '"].indexOf(k) !== -1) { delete _ctx[k]; }\n  });\n' + e(n, i, r, s) + "\n _ctx = _utils.extend(_ctx, __ctx);\n  return _output;\n};\n_ctx." + o + ".safe = true;\n"
		}, n.parse = function(e, t, n, i) {
			var r;
			return n.on(i.VAR, function(e) {
				if (e.match.indexOf(".") !== -1) throw new Error('Unexpected dot in macro argument "' + e.match + '" on line ' + t + ".");
				this.out.push(e.match)
			}), n.on(i.FUNCTION, function(e) {
				r || (r = e.match, this.out.push(r), this.state.push(i.FUNCTION))
			}), n.on(i.FUNCTIONEMPTY, function(e) {
				r || (r = e.match, this.out.push(r))
			}), n.on(i.PARENCLOSE, function() {
				if (!this.isLast) throw new Error("Unexpected parenthesis close on line " + t + ".")
			}), n.on(i.COMMA, function() {
				return !0
			}), n.on("*", function() {}), !0
		}, n.ends = !0, n.block = !0
	},
	{}],
	22: [function(e, t, n) {
		n.compile = function(e, t, n, i, r, s) {
			if (!i || !i.length) return "";
			var o, a, c = t[0],
				l = !0,
				u = i.length,
				d = 0;
			for (d; d < u; d += 1) if (o = i[d], o.blocks && o.blocks.hasOwnProperty(s) && l && c !== o.name) return a = o.blocks[s], a.compile(e, [s], a.content, i.slice(d + 1), r) + "\n"
		}, n.parse = function(e, t, n, i, r, s) {
			return n.on("*", function(e) {
				throw new Error('Unexpected argument "' + e.match + '" on line ' + t + ".")
			}), n.on("end", function() {
				this.out.push(s.filename)
			}), !0
		}
	},
	{}],
	23: [function(e, t, n) {
		n.compile = function(e, t, n, i, r, s) {
			return e(n, i, r, s)
		}, n.parse = function(e, t, n) {
			return n.on("*", function(e) {
				throw new Error('Unexpected token "' + e.match + '" in raw tag on line ' + t + ".")
			}), !0
		}, n.ends = !0
	},
	{}],
	24: [function(e, t, n) {
		n.compile = function(e, t) {
			return t.join(" ") + ";\n"
		}, n.parse = function(e, t, n, i) {
			var r, s = "";
			return n.on(i.VAR, function(e) {
				return r ? void(r += "_ctx." + e.match) : !! n.out.length || void(s += e.match)
			}), n.on(i.BRACKETOPEN, function(e) {
				return !(!r && !this.out.length) || void(r = e.match)
			}), n.on(i.STRING, function(e) {
				return !(r && !this.out.length) || void(r += e.match)
			}), n.on(i.BRACKETCLOSE, function(e) {
				return !(r && !this.out.length) || (s += r + e.match, void(r = void 0))
			}), n.on(i.DOTKEY, function(e) {
				return !r && !s || void(s += "." + e.match)
			}), n.on(i.ASSIGNMENT, function(e) {
				if (this.out.length || !s) throw new Error('Unexpected assignment "' + e.match + '" on line ' + t + ".");
				this.out.push("_ctx." + s), this.out.push(e.match), this.filterApplyIdx.push(this.out.length)
			}), !0
		}, n.block = !0
	},
	{}],
	25: [function(e, t, n) {
		var i = e("../utils");
		n.compile = function(e, t, n, r, s, o) {
			function a(e) {
				return i.map(e, function(e) {
					return e.content || "string" != typeof e ? (e.content = a(e.content), e) : e.replace(/^\s+/, "").replace(/>\s+</g, "><").replace(/\s+$/, "")
				})
			}
			return e(a(n), r, s, o)
		}, n.parse = function(e, t, n) {
			return n.on("*", function(e) {
				throw new Error('Unexpected token "' + e.match + '" on line ' + t + ".")
			}), !0
		}, n.ends = !0
	},
	{
		"../utils": 26
	}],
	26: [function(e, t, n) {
		var i;
		n.strip = function(e) {
			return e.replace(/^\s+|\s+$/g, "")
		}, n.startsWith = function(e, t) {
			return 0 === e.indexOf(t)
		}, n.endsWith = function(e, t) {
			return e.indexOf(t, e.length - t.length) !== -1
		}, n.each = function(e, t) {
			var n, r;
			if (i(e)) for (n = 0, r = e.length, n; n < r && t(e[n], n, e) !== !1; n += 1);
			else
			for (n in e) if (e.hasOwnProperty(n) && t(e[n], n, e) === !1) break;
			return e
		}, n.isArray = i = Array.hasOwnProperty("isArray") ? Array.isArray : function(e) {
			return !!e && ("object" == typeof e && Object.prototype.toString.call(e).indexOf() !== -1)
		}, n.some = function(e, t) {
			var r, s, o = 0;
			if (i(e)) for (s = e.length, o; o < s && !(r = t(e[o], o, e)); o += 1);
			else n.each(e, function(n, i) {
				return r = t(n, i, e), !r
			});
			
			return !!r
		}, n.map = function(e, t) {
			var n, r = 0,
				s = [];
			if (i(e)) for (n = e.length, r; r < n; r += 1) s[r] = t(e[r], r);
			else
			for (r in e) e.hasOwnProperty(r) && (s[r] = t(e[r], r));
			return s
		}, n.extend = function() {
			var e, t, n = arguments,
				i = n[0],
				r = n.length > 1 ? Array.prototype.slice.call(n, 1) : [],
				s = 0,
				o = r.length;
			for (s; s < o; s += 1) {
				t = r[s] || {};
				
				for (e in t) t.hasOwnProperty(e) && (i[e] = t[e])
			}
			return i
		}, n.keys = function(e) {
			return e ? Object.keys ? Object.keys(e) : n.map(e, function(e, t) {
				return t
			}) : []
		}, n.throwError = function(e, t, n) {
			throw t && (e += " on line " + t), n && (e += " in file " + n), new Error(e + ".")
		}
	},
	{}],
	27: [function(e, t, n) {
		function i(e) {
			return "[object Array]" === l.call(e)
		}
		function r(e, t) {
			var n;
			if (null === e) n = {
				__proto__: null
			};
			else {
				if ("object" != typeof e) throw new TypeError("typeof prototype[" + typeof e + "] != 'object'");
				var i = function() {};
				
				i.prototype = e, n = new i, n.__proto__ = e
			}
			return "undefined" != typeof t && Object.defineProperties && Object.defineProperties(n, t), n
		}
		function s(e) {
			return "object" != typeof e && "function" != typeof e || null === e
		}
		function o(e) {
			if (s(e)) throw new TypeError("Object.keys called on a non-object");
			var t = [];
			for (var n in e) u.call(e, n) && t.push(n);
			return t
		}
		function a(e) {
			if (s(e)) throw new TypeError("Object.getOwnPropertyNames called on a non-object");
			var t = o(e);
			return n.isArray(e) && n.indexOf(e, "length") === -1 && t.push("length"), t
		}
		function c(e, t) {
			return {
				value: e[t]
			}
		}
		var l = Object.prototype.toString,
			u = Object.prototype.hasOwnProperty;
		n.isArray = "function" == typeof Array.isArray ? Array.isArray : i, n.indexOf = function(e, t) {
			if (e.indexOf) return e.indexOf(t);
			for (var n = 0; n < e.length; n++) if (t === e[n]) return n;
			return -1
		}, n.filter = function(e, t) {
			if (e.filter) return e.filter(t);
			for (var n = [], i = 0; i < e.length; i++) t(e[i], i, e) && n.push(e[i]);
			return n
		}, n.forEach = function(e, t, n) {
			if (e.forEach) return e.forEach(t, n);
			for (var i = 0; i < e.length; i++) t.call(n, e[i], i, e)
		}, n.map = function(e, t) {
			if (e.map) return e.map(t);
			for (var n = new Array(e.length), i = 0; i < e.length; i++) n[i] = t(e[i], i, e);
			return n
		}, n.reduce = function(e, t, n) {
			if (e.reduce) return e.reduce(t, n);
			var i, r = !1;
			2 < arguments.length && (i = n, r = !0);
			for (var s = 0, o = e.length; o > s; ++s) e.hasOwnProperty(s) && (r ? i = t(i, e[s], s, e) : (i = e[s], r = !0));
			return i
		}, "b" !== "ab".substr(-1) ? n.substr = function(e, t, n) {
			return t < 0 && (t = e.length + t), e.substr(t, n)
		} : n.substr = function(e, t, n) {
			return e.substr(t, n)
		}, n.trim = function(e) {
			return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
		}, n.bind = function() {
			var e = Array.prototype.slice.call(arguments),
				t = e.shift();
			
			if (t.bind) return t.bind.apply(t, e);
			var n = e.shift();
			
			return function() {
				t.apply(n, e.concat([Array.prototype.slice.call(arguments)]))
			}
		}, n.create = "function" == typeof Object.create ? Object.create : r;
		var d = "function" == typeof Object.keys ? Object.keys : o,
			p = "function" == typeof Object.getOwnPropertyNames ? Object.getOwnPropertyNames : a;
		if ((new Error).hasOwnProperty("description")) {
			var f = function(e, t) {
				return "[object Error]" === l.call(e) && (t = n.filter(t, function(e) {
					return "description" !== e && "number" !== e && "message" !== e
				})), t
			};
			
			n.keys = function(e) {
				return f(e, d(e))
			}, n.getOwnPropertyNames = function(e) {
				return f(e, p(e))
			}
		} else n.keys = d, n.getOwnPropertyNames = p;
		if ("function" == typeof Object.getOwnPropertyDescriptor) try {
			Object.getOwnPropertyDescriptor({
				a: 1
			}, "a"), n.getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor
		} catch (h) {
			n.getOwnPropertyDescriptor = function(e, t) {
				try {
					return Object.getOwnPropertyDescriptor(e, t)
				} catch (n) {
					return c(e, t)
				}
			}
		} else n.getOwnPropertyDescriptor = c
	},
	{}],
	28: [function(e, t, n) {},
	{}],
	29: [function(e, t, n) {
		function i(e, t) {
			for (var n = 0, i = e.length - 1; i >= 0; i--) {
				var r = e[i];
				"." === r ? e.splice(i, 1) : ".." === r ? (e.splice(i, 1), n++) : n && (e.splice(i, 1), n--)
			}
			if (t) for (; n--; n) e.unshift("..");
			return e
		}
		var r = e("__browserify_process"),
			s = e("util"),
			o = e("_shims"),
			a = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,
			c = function(e) {
				return a.exec(e).slice(1)
			};
		
		n.resolve = function() {
			for (var e = "", t = !1, n = arguments.length - 1; n >= -1 && !t; n--) {
				var a = n >= 0 ? arguments[n] : r.cwd();
				
				if (!s.isString(a)) throw new TypeError("Arguments to path.resolve must be strings");
				a && (e = a + "/" + e, t = "/" === a.charAt(0))
			}
			return e = i(o.filter(e.split("/"), function(e) {
				return !!e
			}), !t).join("/"), (t ? "/" : "") + e || "."
		}, n.normalize = function(e) {
			var t = n.isAbsolute(e),
				r = "/" === o.substr(e, -1);
			return e = i(o.filter(e.split("/"), function(e) {
				return !!e
			}), !t).join("/"), e || t || (e = "."), e && r && (e += "/"), (t ? "/" : "") + e
		}, n.isAbsolute = function(e) {
			return "/" === e.charAt(0)
		}, n.join = function() {
			var e = Array.prototype.slice.call(arguments, 0);
			return n.normalize(o.filter(e, function(e, t) {
				if (!s.isString(e)) throw new TypeError("Arguments to path.join must be strings");
				return e
			}).join("/"))
		}, n.relative = function(e, t) {
			function i(e) {
				for (var t = 0; t < e.length && "" === e[t]; t++);
				for (var n = e.length - 1; n >= 0 && "" === e[n]; n--);
				return t > n ? [] : e.slice(t, n - t + 1)
			}
			e = n.resolve(e).substr(1), t = n.resolve(t).substr(1);
			for (var r = i(e.split("/")), s = i(t.split("/")), o = Math.min(r.length, s.length), a = o, c = 0; c < o; c++) if (r[c] !== s[c]) {
				a = c;
				break
			}
			for (var l = [], c = a; c < r.length; c++) l.push("..");
			return l = l.concat(s.slice(a)), l.join("/")
		}, n.sep = "/", n.delimiter = ":", n.dirname = function(e) {
			var t = c(e),
				n = t[0],
				i = t[1];
			return n || i ? (i && (i = i.substr(0, i.length - 1)), n + i) : "."
		}, n.basename = function(e, t) {
			var n = c(e)[2];
			return t && n.substr(-1 * t.length) === t && (n = n.substr(0, n.length - t.length)), n
		}, n.extname = function(e) {
			return c(e)[3]
		}
	},
	{
		__browserify_process: 31,
		_shims: 27,
		util: 30
	}],
	30: [function(e, t, n) {
		function i(e, t) {
			var i = {
				seen: [],
				stylize: s
			};
			
			return arguments.length >= 3 && (i.depth = arguments[2]), arguments.length >= 4 && (i.colors = arguments[3]), h(t) ? i.showHidden = t : t && n._extend(i, t), b(i.showHidden) && (i.showHidden = !1), b(i.depth) && (i.depth = 2), b(i.colors) && (i.colors = !1), b(i.customInspect) && (i.customInspect = !0), i.colors && (i.stylize = r), a(i, e, i.depth)
		}
		function r(e, t) {
			var n = i.styles[t];
			return n ? "[" + i.colors[n][0] + "m" + e + "[" + i.colors[n][1] + "m" : e
		}
		function s(e, t) {
			return e
		}
		function o(e) {
			var t = {};
			
			return A.forEach(e, function(e, n) {
				t[e] = !0
			}), t
		}
		function a(e, t, i) {
			if (e.customInspect && t && C(t.inspect) && t.inspect !== n.inspect && (!t.constructor || t.constructor.prototype !== t)) {
				var r = t.inspect(i);
				return v(r) || (r = a(e, r, i)), r
			}
			var s = c(e, t);
			if (s) return s;
			var h = A.keys(t),
				m = o(h);
			if (e.showHidden && (h = A.getOwnPropertyNames(t)), 0 === h.length) {
				if (C(t)) {
					var g = t.name ? ": " + t.name : "";
					return e.stylize("[Function" + g + "]", "special")
				}
				if ($(t)) return e.stylize(RegExp.prototype.toString.call(t), "regexp");
				if (j(t)) return e.stylize(Date.prototype.toString.call(t), "date");
				if (x(t)) return l(t)
			}
			var _ = "",
				y = !1,
				b = ["{", "}"];
			if (f(t) && (y = !0, b = ["[", "]"]), C(t)) {
				var w = t.name ? ": " + t.name : "";
				_ = " [Function" + w + "]"
			}
			if ($(t) && (_ = " " + RegExp.prototype.toString.call(t)), j(t) && (_ = " " + Date.prototype.toUTCString.call(t)), x(t) && (_ = " " + l(t)), 0 === h.length && (!y || 0 == t.length)) return b[0] + _ + b[1];
			if (i < 0) return $(t) ? e.stylize(RegExp.prototype.toString.call(t), "regexp") : e.stylize("[Object]", "special");
			e.seen.push(t);
			var k;
			return k = y ? u(e, t, i, m, h) : h.map(function(n) {
				return d(e, t, i, m, n, y)
			}), e.seen.pop(), p(k, _, b)
		}
		function c(e, t) {
			if (b(t)) return e.stylize("undefined", "undefined");
			if (v(t)) {
				var n = "'" + JSON.stringify(t).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
				return e.stylize(n, "string")
			}
			return _(t) ? e.stylize("" + t, "number") : h(t) ? e.stylize("" + t, "boolean") : m(t) ? e.stylize("null", "null") : void 0
		}
		function l(e) {
			return "[" + Error.prototype.toString.call(e) + "]"
		}
		function u(e, t, n, i, r) {
			for (var s = [], o = 0, a = t.length; o < a; ++o) E(t, String(o)) ? s.push(d(e, t, n, i, String(o), !0)) : s.push("");
			return A.forEach(r, function(r) {
				r.match(/^\d+$/) || s.push(d(e, t, n, i, r, !0))
			}), s
		}
		function d(e, t, n, i, r, s) {
			var o, c, l;
			if (l = A.getOwnPropertyDescriptor(t, r) || {
				value: t[r]
			}, l.get ? c = l.set ? e.stylize("[Getter/Setter]", "special") : e.stylize("[Getter]", "special") : l.set && (c = e.stylize("[Setter]", "special")), E(i, r) || (o = "[" + r + "]"), c || (A.indexOf(e.seen, l.value) < 0 ? (c = m(n) ? a(e, l.value, null) : a(e, l.value, n - 1), c.indexOf("\n") > -1 && (c = s ? c.split("\n").map(function(e) {
				return "  " + e
			}).join("\n").substr(2) : "\n" + c.split("\n").map(function(e) {
				return "   " + e
			}).join("\n"))) : c = e.stylize("[Circular]", "special")), b(o)) {
				if (s && r.match(/^\d+$/)) return c;
				o = JSON.stringify("" + r), o.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (o = o.substr(1, o.length - 2), o = e.stylize(o, "name")) : (o = o.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), o = e.stylize(o, "string"))
			}
			return o + ": " + c
		}
		function p(e, t, n) {
			var i = 0,
				r = A.reduce(e, function(e, t) {
					return i++, t.indexOf("\n") >= 0 && i++, e + t.replace(/\u001b\[\d\d?m/g, "").length + 1
				}, 0);
			return r > 60 ? n[0] + ("" === t ? "" : t + "\n ") + " " + e.join(",\n  ") + " " + n[1] : n[0] + t + " " + e.join(", ") + " " + n[1]
		}
		function f(e) {
			return A.isArray(e)
		}
		function h(e) {
			return "boolean" == typeof e
		}
		function m(e) {
			return null === e
		}
		function g(e) {
			return null == e
		}
		function _(e) {
			return "number" == typeof e
		}
		function v(e) {
			return "string" == typeof e
		}
		function y(e) {
			return "symbol" == typeof e
		}
		function b(e) {
			return void 0 === e
		}
		function $(e) {
			return w(e) && "[object RegExp]" === T(e)
		}
		function w(e) {
			return "object" == typeof e && e
		}
		function j(e) {
			return w(e) && "[object Date]" === T(e)
		}
		function x(e) {
			return w(e) && "[object Error]" === T(e)
		}
		function C(e) {
			return "function" == typeof e
		}
		function k(e) {
			return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" == typeof e || "undefined" == typeof e
		}
		function N(e) {
			return e && "object" == typeof e && "function" == typeof e.copy && "function" == typeof e.fill && "function" == typeof e.binarySlice
		}
		function T(e) {
			return Object.prototype.toString.call(e)
		}
		function O(e) {
			return e < 10 ? "0" + e.toString(10) : e.toString(10)
		}
		function S() {
			var e = new Date,
				t = [O(e.getHours()), O(e.getMinutes()), O(e.getSeconds())].join(":");
			return [e.getDate(), U[e.getMonth()], t].join(" ")
		}
		function E(e, t) {
			return Object.prototype.hasOwnProperty.call(e, t)
		}
		var A = e("_shims"),
			D = /%[sdj%]/g;
		n.format = function(e) {
			if (!v(e)) {
				for (var t = [], n = 0; n < arguments.length; n++) t.push(i(arguments[n]));
				return t.join(" ")
			}
			for (var n = 1, r = arguments, s = r.length, o = String(e).replace(D, function(e) {
				if ("%%" === e) return "%";
				if (n >= s) return e;
				switch (e) {
					case "%s":
						return String(r[n++]);
					case "%d":
						return Number(r[n++]);
					case "%j":
						try {
							return JSON.stringify(r[n++])
						} catch (t) {
							return "[Circular]"
						}
					default:
						return e
				}
			}), a = r[n]; n < s; a = r[++n]) o += m(a) || !w(a) ? " " + a : " " + i(a);
			return o
		}, n.inspect = i, i.colors = {
			bold: [1, 22],
			italic: [3, 23],
			underline: [4, 24],
			inverse: [7, 27],
			white: [37, 39],
			grey: [90, 39],
			black: [30, 39],
			blue: [34, 39],
			cyan: [36, 39],
			green: [32, 39],
			magenta: [35, 39],
			red: [31, 39],
			yellow: [33, 39]
		}, i.styles = {
			special: "cyan",
			number: "yellow",
			"boolean": "yellow",
			undefined: "grey",
			"null": "bold",
			string: "green",
			date: "magenta",
			regexp: "red"
		}, n.isArray = f, n.isBoolean = h, n.isNull = m, n.isNullOrUndefined = g, n.isNumber = _, n.isString = v, n.isSymbol = y, n.isUndefined = b, n.isRegExp = $, n.isObject = w, n.isDate = j, n.isError = x, n.isFunction = C, n.isPrimitive = k, n.isBuffer = N;
		var U = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		n.log = function() {
			console.log("%s - %s", S(), n.format.apply(n, arguments))
		}, n.inherits = function(e, t) {
			e.super_ = t, e.prototype = A.create(t.prototype, {
				constructor: {
					value: e,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			})
		}, n._extend = function(e, t) {
			if (!t || !w(t)) return e;
			for (var n = A.keys(t), i = n.length; i--;) e[n[i]] = t[n[i]];
			return e
		}
	},
	{
		_shims: 27
	}],
	31: [function(e, t, n) {
		var i = t.exports = {};
		
		i.nextTick = function() {
			var e = "undefined" != typeof window && window.setImmediate,
				t = "undefined" != typeof window && window.postMessage && window.addEventListener;
			if (e) return function(e) {
				return window.setImmediate(e)
			};
			
			if (t) {
				var n = [];
				return window.addEventListener("message", function(e) {
					var t = e.source;
					if ((t === window || null === t) && "process-tick" === e.data && (e.stopPropagation(), n.length > 0)) {
						var i = n.shift();
						
						i()
					}
				}, !0), function(e) {
					n.push(e), window.postMessage("process-tick", "*")
				}
			}
			return function(e) {
				setTimeout(e, 0)
			}
		}(), i.title = "browser", i.browser = !0, i.env = {}, i.argv = [], i.binding = function(e) {
			throw new Error("process.binding is not supported")
		}, i.cwd = function() {
			return "/"
		}, i.chdir = function(e) {
			throw new Error("process.chdir is not supported")
		}
	},
	{}]
}, {}, [1]), function(e) {
	"use strict";
	e.fn.serializeJSON = function(t) {
		var n, i, r, s, o, a, c;
		return a = e.serializeJSON, c = a.optsWithDefaults(t), a.validateOptions(c), i = this.serializeArray(), a.readCheckboxUncheckedValues(i, this, c), n = {}, e.each(i, function(e, t) {
			r = a.splitInputNameIntoKeysArray(t.name), s = r.pop(), "skip" !== s && (o = a.parseValue(t.value, s, c), c.parseWithFunction && "_" === s && (o = c.parseWithFunction(o, t.name)), a.deepSet(n, r, o, c))
		}), n
	}, e.serializeJSON = {
		defaultOptions: {
			parseNumbers: !1,
			parseBooleans: !1,
			parseNulls: !1,
			parseAll: !1,
			parseWithFunction: null,
			checkboxUncheckedValue: void 0,
			useIntKeysAsArrayIndex: !1
		},
		
		optsWithDefaults: function(t) {
			var n, i;
			return null == t && (t = {}), n = e.serializeJSON, i = n.optWithDefaults("parseAll", t), {
				parseNumbers: i || n.optWithDefaults("parseNumbers", t),
				parseBooleans: i || n.optWithDefaults("parseBooleans", t),
				parseNulls: i || n.optWithDefaults("parseNulls", t),
				parseWithFunction: n.optWithDefaults("parseWithFunction", t),
				checkboxUncheckedValue: n.optWithDefaults("checkboxUncheckedValue", t),
				useIntKeysAsArrayIndex: n.optWithDefaults("useIntKeysAsArrayIndex", t)
			}
		},
		
		optWithDefaults: function(t, n) {
			return n[t] !== !1 && "" !== n[t] && (n[t] || e.serializeJSON.defaultOptions[t])
		},
		
		validateOptions: function(e) {
			var t, n;
			n = ["parseNumbers", "parseBooleans", "parseNulls", "parseAll", "parseWithFunction", "checkboxUncheckedValue", "useIntKeysAsArrayIndex"];
			for (t in e) if (n.indexOf(t) === -1) throw new Error("serializeJSON ERROR: invalid option '" + t + "'. Please use one of " + n.join(","))
		},
		
		parseValue: function(t, n, i) {
			var r;
			return r = e.serializeJSON, "string" == n ? t : "number" == n || i.parseNumbers && r.isNumeric(t) ? Number(t) : "boolean" == n || i.parseBooleans && ("true" === t || "false" === t) ? ["false", "null", "undefined", "", "0"].indexOf(t) === -1 : "null" == n || i.parseNulls && "null" == t ? ["false", "null", "undefined", "", "0"].indexOf(t) !== -1 ? null : t : "array" == n || "object" == n ? JSON.parse(t) : "auto" == n ? r.parseValue(t, null, {
				parseNumbers: !0,
				parseBooleans: !0,
				parseNulls: !0
			}) : t
		},
		
		isObject: function(e) {
			return e === Object(e)
		},
		
		isUndefined: function(e) {
			return void 0 === e
		},
		
		isValidArrayIndex: function(e) {
			return /^[0-9]+$/.test(String(e))
		},
		
		isNumeric: function(e) {
			return e - parseFloat(e) >= 0
		},
		
		splitInputNameIntoKeysArray: function(t) {
			var n, i, r, s, o;
			return o = e.serializeJSON, s = o.extractTypeFromInputName(t), i = s[0], r = s[1], n = i.split("["), n = e.map(n, function(e) {
				return e.replace(/]/g, "")
			}), "" === n[0] && n.shift(), n.push(r), n
		},
		
		extractTypeFromInputName: function(t) {
			var n, i;
			if (i = e.serializeJSON, n = t.match(/(.*):([^:]+)$/)) {
				var r = ["string", "number", "boolean", "null", "array", "object", "skip", "auto"];
				if (r.indexOf(n[2]) !== -1) return [n[1], n[2]];
				throw new Error("serializeJSON ERROR: Invalid type " + n[2] + " found in input name '" + t + "', please use one of " + r.join(", "))
			}
			return [t, "_"]
		},
		
		deepSet: function(t, n, i, r) {
			var s, o, a, c, l, u;
			if (null == r && (r = {}), u = e.serializeJSON, u.isUndefined(t)) throw new Error("ArgumentError: param 'o' expected to be an object or array, found undefined");
			if (!n || 0 === n.length) throw new Error("ArgumentError: param 'keys' expected to be an array with least one element");
			s = n[0], 1 === n.length ? "" === s ? t.push(i) : t[s] = i : (o = n[1], "" === s && (c = t.length - 1, l = t[c], s = u.isObject(l) && (u.isUndefined(l[o]) || n.length > 2) ? c : c + 1), u.isUndefined(t[s]) && ("" === o ? t[s] = [] : r.useIntKeysAsArrayIndex && u.isValidArrayIndex(o) ? t[s] = [] : t[s] = {}), a = n.slice(1), u.deepSet(t[s], a, i, r))
		},
		
		readCheckboxUncheckedValues: function(t, n, i) {
			var r, s, o, a, c;
			null == i && (i = {}), c = e.serializeJSON, r = "input[type=checkbox][name]:not(:checked,[disabled])", s = n.find(r).add(n.filter(r)), s.each(function(n, r) {
				o = e(r), a = o.attr("data-unchecked-value"), a ? t.push({
					name: r.name,
					value: a
				}) : c.isUndefined(i.checkboxUncheckedValue) || t.push({
					name: r.name,
					value: i.checkboxUncheckedValue
				})
			})
		}
	}
}(window.jQuery || window.Zepto || window.$), eUndac = {
	Models: {},
	
	Collections: {},
	
	Views: {},
	
	Routers: {}
}, window.eUndac = eUndac, eUndac.Models.Organization = Backbone.Model.extend({
	idAttribute: "idget",
	urlRoot: "/rest/organization"
}), eUndac.Models.Preregister = Backbone.Model.extend({
	idAttribute: "idget",
	urlRoot: "/rest/preregister"
}), eUndac.Models.Period = Backbone.Model.extend({
	idAttribute: "idget",
	urlRoot: "/rest/period"
}), eUndac.Models.Year = Backbone.Model.extend({
	urlRoot: "/rest/year"
}), eUndac.Models.UserData = Backbone.Model.extend({
	urlRoot: "/rest/userdata"
}), eUndac.Models.UserPayment = Backbone.Model.extend({
	urlRoot: "/rest/userpayment"
}), eUndac.Models.Faculty = Backbone.Model.extend({
	idAttribute: "idget",
	urlRoot: "/rest/faculty"
}), eUndac.Models.Subsidiary = Backbone.Model.extend({
	idAttribute: "idget",
	urlRoot: "/rest/subsidiary"
}), eUndac.Models.School = Backbone.Model.extend({
	idAttribute: "idget",
	urlRoot: "/rest/school"
}), eUndac.Models.Speciality = Backbone.Model.extend({
	idAttribute: "idget",
	urlRoot: "/rest/speciality"
}), eUndac.Models.Person = Backbone.Model.extend({
	idAttribute: "idget",
	urlRoot: "/rest/person"
}), eUndac.Models.User = Backbone.Model.extend({
	idAttribute: "idget",
	urlRoot: "/rest/user"
}), eUndac.Models.Course = Backbone.Model.extend({
	idAttribute: "idget",
	urlRoot: "/rest/coursesregularize"
}), eUndac.Models.Regularize = Backbone.Model.extend({
	idAttribute: "idget",
	urlRoot: "/rest/regularize"
}), eUndac.Models.Rol = Backbone.Model.extend({
	idAttribute: "idget",
	urlRoot: "/rest/rol"
}), eUndac.Models.Rate = Backbone.Model.extend({
	idAttribute: "idget",
	urlRoot: "/rest/rate"
}), eUndac.Models.Course = Backbone.Model.extend({
	idAttribute: "idget",
	urlRoot: "/rest/listconvalidation"
}), eUndac.Models.Convalidation = Backbone.Model.extend({
	idAttribute: "idget",
	urlRoot: "/rest/convalidation"
}), eUndac.Collections.Admin_Organizations = Backbone.Collection.extend({
	url: "/rest/organization",
	model: eUndac.Models.Organization,
	initialize: function() {
		this.on("add", function(e) {
			view = new eUndac.Views.Admin_Organizations({
				model: e
			})
		})
	}
}), eUndac.Collections.PreregisterCourses = Backbone.Collection.extend({
	initialize: function(e) {
		var t = this;
		this.model_data_user = e.model_user, this.model_data_payment = e.model_payments;
		var n = e.success_pre;
		if (!n || "B" === n) {
			var i = 3;
			e.more_semester && (i = parseInt(i) + parseInt(e.more_semester));
			var r = !1
		}
		this.fetch({
			success: function(e, s) {
				if (s) if (n && "B" !== n) {
					if ("I" === n) {
						var o = [],
							a = e.models[0].toJSON().semester_roman_assign;
						e.forEach(function(e) {
							o.push(e)
						}), t.renderPreSuccess(o, a)
					} else if ("M" === n) {
						var c = [],
							l = e.models[0].toJSON().semester_roman_assign;
						e.forEach(function(e) {
							c.push(e)
						}), t.renderRegisterSuccess(c, l)
					}
				} else {
					var u = (t.where({
						condition: !0
					}), []),
						d = "-",
						p = 0;
					e.forEach(function(e) {
						var t = e.toJSON().semester;
						t !== d && (d = t, p++), p <= i && e.toJSON().condition === !0 && u.push(e)
					});
					
					var f = t.verifyCondition(u),
						h = "A",
						m = "N";
					f.conditional && !f.conditional_allow && (h = "I", m = "C");
					var g = {
						type: m,
						conditional_amount: f.conditional_amount
					},
						_ = (new eUndac.Views.Paragraphs({
							data_render: g,
							where_render: $("#js_paragraph")
						}), []);
					d = "-", p = 0;
					var v;
					e.every(function(e) {
						var t = e.toJSON().semester + e.toJSON().turn,
							n = e.toJSON().semester;
						return v = !1, _.forEach(function(e) {
							e === t && (v = !0)
						}), v || _.push(t), !(n !== d && (d = n, p++, p > i)) && (view_course = new eUndac.Views.Course({
							model: e,
							typeRender: h,
							where_render: $("#js_main-data")
						}), !0)
					}), t.putCredits(f.conditional_credits, _, r), "A" === h && t.buttonPreregister(u)
				} else {
					new eUndac.Views.TypeError({
						type: "EC"
					})
				}
			},
			
			error: function() {
				new eUndac.Views.TypeError
			}
		}), this.on("change", function(e) {
			var t = e.toJSON().code,
				n = e.toJSON().turn,
				i = e.toJSON().type,
				r = e.toJSON().group_elective,
				s = e.toJSON().type_semester,
				o = this.where({
					code: t
				});
			
			if (o.forEach(function(e) {
				e.toJSON().code === t && e.toJSON().turn !== n && e.toJSON().carry && e.set({
					carry: !1
				}, {
					silent: !0
				})
			}), "E" === i) {
				var a = this.where({
					type_semester: s
				});
				
				a.forEach(function(e) {
					e.toJSON().code != t && e.toJSON().group_elective == r && e.toJSON().carry && e.set({
						carry: !1
					}, {
						silent: !0
					})
				})
			}
		})
	},
	
	url: "/rest/preregister",
	model: eUndac.Models.Preregister,
	verifyCondition: function(e) {
		var t = {
			conditional: !1,
			conditional_allow: !1,
			conditional_credits: 0,
			conditional_amount: 0
		},
			n = "-";
		return e.forEach(function(e) {
			n !== e.toJSON().code && (n = e.toJSON().code, t.conditional_allow = !1, t.conditional = !0, t.conditional_amount++, condition_allow = e.toJSON().condition_allow, t.conditional_credits = t.conditional_credits + e.toJSON().credits, condition_allow && (t.conditional_allow = !0))
		}), t
	},
	
	putCredits: function(e, t, n) {
		var i = 11,
			r = null;
		0 === e ? (t.forEach(function(e) {
			$("#js_credit" + e).data().credits >= i && (i = $("#js_credit" + e).data().credits, r = $("#js_credit" + e).data().semester_roman)
		}), i++, $("#js_credits_current").data("credits", 0)) : (t.forEach(function(e) {
			$("#js_credit" + e).data("credits", 10)
		}), $("#js_credits_current").data("credits", 0)), n && (i = parseInt(i) + parseInt(n));
		var s = this.model_data_user.toJSON(),
			o = s.main_info.perid,
			a = o.substring(2, 3);
		"N" === a ? $("#js_period-assign").data("credits", "12").data("semester", r).html("12") : $("#js_period-assign").data("credits", i).data("semester", r).html(i)
	},
	
	buttonPreregister: function(e) {
		var t, n = this,
			i = $("#js_button_submit"),
			r = $("#js_confirm--button-back"),
			s = $("#js_confirm--button-confirm");
		setTimeout(function() {
			i.addClass("fadeUp")
		}, 300), i.on("click", function() {
			var i = !0;
			if (e.length > 0) {
				var r, s, o, a = 0,
					c = 0;
				e.forEach(function(e) {
					course_code_self = e.toJSON().code, s != course_code_self && (a++, r = !0, s = course_code_self, e.toJSON().carry || (r = !1, o = n.where({
						code: e.toJSON().code
					}), o.length > 0 && o.forEach(function(t) {
						e.toJSON().turn !== t.toJSON().turn && t.toJSON().carry && (r = !0)
					})), r && c++)
				}), a !== c && (i = !1)
			}
			if (i) {
				t = n.where({
					carry: !0
				});
				
				for (var l = n.last().toJSON().semester, u = n.first().toJSON().semester, d = [], p = 0, f = u; f <= l; f++) {
					var h = n.where({
						semester: f
					});
					
					h.length > 0 && (d[p] = h, p++)
				}
				if (d.forEach(function(e, t) {
					var n = 0,
						i = 0,
						r = 0,
						s = 0;
					if (e.forEach(function(t, o) {
						1 == t.toJSON().carry && "X" != t.toJSON().type && n++, "O" == t.toJSON().type && (i++, e[o - 1] && t.toJSON().code == e[o - 1].toJSON().code && i--), "E" == t.toJSON().type && r++, "X" == t.toJSON().type && s++
					}), r > 0) var o = 1;
					else
					var o = 0;
					d[t].total_courses = i + o, d[t].total_courses_carry = n, i + o == n ? d[t].success = !0 : d[t].success = !1
				}), t.length > 0) {
					var m = 0;
					d.forEach(function(e, t) {
						if (!e.success && d[t + 1] && d[t + 1].total_courses_carry > 0) return $("#js_paragraph-carry-diferent").addClass("active"), setTimeout(function() {
							$("#js_paragraph-carry-diferent").removeClass("active")
						}, 3e3), m = 1, !1
					}), 0 == m && n.renderConfirmation(t)
				} else $("#js_paragraph-carry-less-one").addClass("active"), setTimeout(function() {
					$("#js_paragraph-carry-less-one").removeClass("active")
				}, 2e3)
			} else $("#js_paragraph-charge-conditional").addClass("active")
		}), r.on("click", this.backFromConfirmation), s.on("click", function() {
			n.confirmSubmit(t)
		})
	},
	
	renderConfirmation: function(e) {
		$("#js_content-pick-course").addClass("inactive"), setTimeout(function() {
			$("#js_content-pick-course").removeClass("active inactive"), $("#js_content-confirm-pick").addClass("active")
		}, 300);
		var t = 0,
			n = $("#js_period-assign").data().semester,
			i = $("#js_period-assign").data().credits,
			r = $("#js_period-assign").data().semester_roman;
		e.forEach(function(e) {
			e.set({
				semester_assign: n,
				credits_assign: i
			}, {
				silent: !0
			}), view_course = new eUndac.Views.Course({
				model: e,
				typeRender: "I",
				where_render: $("#js_main-data-confirm")
			}), t++
		});
		
		var s = {
			type: "CO",
			many_courses: t,
			semester_assign: r
		};
		
		new eUndac.Views.Paragraphs({
			data_render: s,
			where_render: $("#js_paragraph-confirm")
		})
	},
	
	backFromConfirmation: function() {
		$("#js_content-confirm-pick").addClass("inactive"), setTimeout(function() {
			$("#js_main-data-confirm").html(""), $("#js_content-confirm-pick").removeClass("active inactive"), $("#js_content-pick-course").addClass("active")
		}, 300)
	},
	
	confirmSubmit: function(e) {
		$("#js_confirm--button-back, #js_confirm--button-confirm").attr("disabled", !0), $("#js_paragraph-charge").addClass("active");
		var t = this,
			n = 0,
			i = 0,
			r = $("#js_period-assign").data().semester_roman;
		e.forEach(function(s) {
			n++, s.save(null, {
				success: function(s, o) {
					1 === o.success ? (i++, n === i && t.renderPreSuccess(e, r)) : 0 === o.success && console.log("error al guardar")
				},
				
				error: function() {
					console.log("error al guardar en la db...")
				}
			})
		})
	},
	
	renderPreSuccess: function(e, t) {
		var n = $("#js_button_delete_pre");
		$("#js_content-pick-course").removeClass("active"), $("#js_content-confirm-pick").addClass("inactive"), setTimeout(function() {
			$("#js_content-confirm-pick").removeClass("active inactive"), $("#js_preregister-success").addClass("active")
		}, 300);
		var i = 0;
		e.forEach(function(e) {
			view_course = new eUndac.Views.Course({
				model: e,
				typeRender: "I",
				where_render: $("#js_success-main-data")
			}), i++
		});
		
		var r = {
			type: "PS",
			many_courses: i,
			semester_assign: t
		},
			s = (new eUndac.Views.Paragraphs({
				data_render: r,
				where_render: $("#js_success-paragraph")
			}), new eUndac.Views.PreregisterAuxiliar({
				type: "PR"
			}));
		s.render(), $(".js_auxiliar").html(s.$el);
		var o = this.model_data_user,
			a = o.toJSON().main_info.uid,
			c = o.toJSON().main_info.perid,
			l = c.substring(2, 3),
			u = new Date,
			d = u.getFullYear();
		
		d = d.toString();
		
		var p = d.substring(2, 4),
			f = a.substring(0, 2);
		if (f != p && "A" == l) {
			new eUndac.Views.PreregisterDelete({
				model: this.model_data_user,
				model_course: e[0]
			});
			
			n.on("click", function() {
				$("#js_msg-confirm-delete").addClass("active")
			})
		} else $("#js_button_delete_pre").addClass("hidden")
	},
	
	renderRegisterSuccess: function(e, t) {
		$("#js_content-pick-course").removeClass("active"), $("#js_register-success").addClass("active");
		var n = 0;
		e.forEach(function(e) {
			view_course = new eUndac.Views.Course({
				model: e,
				typeRender: "I",
				where_render: $("#js_reg_success-main-data")
			}), n++
		});
		
		var i = {
			type: "RS",
			many_courses: n,
			semester_assign: t
		};
		
		new eUndac.Views.Paragraphs({
			data_render: i,
			where_render: $("#js_reg_success-paragraph")
		})
	}
}), eUndac.Collections.Admin_Periods = Backbone.Collection.extend({
	initialize: function(e) {
		e.id && (this.id = e.id), this.on("add", function(e) {
			view = new eUndac.Views.Admin_Periods({
				model: e
			})
		}), this.on("change", function(e) {
			if (e.changed.new_active) {
				var t = this.where({
					state: "A"
				});
				
				t.forEach(function(t) {
					e.id != t.id && (t.set({
						state: "T",
						state_before: "A",
						new_active: !1
					}), t.save())
				})
			}
		}, this)
	},
	
	url: function() {
		return this.id ? "/rest/period/id/" + this.id : "/rest/period"
	},
	
	model: eUndac.Models.Period
}), eUndac.Collections.Years = Backbone.Collection.extend({
	url: "/rest/year",
	model: eUndac.Models.Year
}), eUndac.Collections.UserPayments = Backbone.Collection.extend({
	url: "/rest/userpayment",
	model: eUndac.Models.UserPayment
}), eUndac.Collections.Admin_Facultys = Backbone.Collection.extend({
	url: "/rest/faculty",
	model: eUndac.Models.Faculty,
	initialize: function() {
		this.on("add", function(e) {
			view = new eUndac.Views.Admin_Facultys({
				model: e
			})
		})
	}
}), eUndac.Collections.Admin_Subsidiarys = Backbone.Collection.extend({
	model: eUndac.Models.Subsidiary,
	url: "/rest/subsidiary",
	initialize: function(e) {
		this.on("add", function(e) {
			view = new eUndac.Views.Admin_Subsidiarys({
				model: e
			})
		})
	}
}), eUndac.Collections.Schools = Backbone.Collection.extend({
	initialize: function(e) {
		e.id && (this.id = e.id), this.on("add", function(e) {
			view = new eUndac.Views.School_View({
				model: e
			})
		}), this.on("change", function(e) {
			if (e.changed.new_active) {
				var t = this.where({
					state: "A"
				});
				
				t.forEach(function(t) {
					e.id != t.id && (t.set({
						state: "I",
						state_before: "A",
						new_active: !1
					}), t.save())
				})
			}
		}, this)
	},
	
	url: function() {
		return this.id ? "/rest/school/id/" + this.id : "/rest/school"
	},
	
	model: eUndac.Models.School
}), eUndac.Collections.Speciality = Backbone.Collection.extend({
	initialize: function(e) {
		e.id && (this.id = e.id), this.on("add", function(e) {
			view = new eUndac.Views.Parent({
				model: e
			})
		})
	},
	
	url: function() {
		return this.id ? "/rest/speciality/id/" + this.id : "/rest/speciality"
	},
	
	model: eUndac.Models.Speciality
}), eUndac.Collections.Persons = Backbone.Collection.extend({
	initialize: function(e) {
		e.id && (this.id = e.id), this.on("add", function(e) {
			view = new eUndac.Views.Person_View({
				model: e
			})
		})
	},
	
	url: function() {
		return this.id ? "/rest/person/id/" + this.id : "/rest/person"
	},
	
	model: eUndac.Models.Person
}), eUndac.Collections.Users = Backbone.Collection.extend({
	initialize: function(e) {
		e.id && (this.id = e.id), this.on("add", function(e) {
			view = new eUndac.Views.User_View({
				model: e
			})
		})
	},
	
	url: function() {
		return this.id ? "/rest/user/id/" + this.id : "/rest/user"
	},
	
	model: eUndac.Models.User
}), eUndac.Collections.List_Period = Backbone.Collection.extend({
	initialize: function(e) {
		e.id && (this.id = e.id)
	},
	
	url: function() {
		return this.id ? "/rest/period/id/" + this.id : "/rest/period"
	},
	
	model: eUndac.Models.Period
}), eUndac.Collections.Admin_Regularize = Backbone.Collection.extend({
	initialize: function(e) {
		e.id && (this.id = e.id), this.on("add", function(e) {
			view = new eUndac.Views.Admin_Teachers({
				model: e
			})
		})
	},
	
	url: function() {
		return this.id ? "/rest/regularize/id/" + this.id : "/rest/regularize"
	},
	
	model: eUndac.Models.Regularize
}), eUndac.Collections.CoursesRegularize = Backbone.Collection.extend({
	initialize: function(e) {
		e.id && (this.id = e.id), this.on("add", function(e) {
			view = new eUndac.Views.CourseRegularize_View({
				model: e
			})
		})
	},
	
	url: function() {
		return this.id ? "/rest/coursesregularize/id/" + this.id : "/rest/coursesregularize"
	},
	
	model: eUndac.Models.Course
}), eUndac.Collections.Admin_Roles = Backbone.Collection.extend({
	model: eUndac.Models.Rol,
	url: "/rest/rol",
	initialize: function(e) {
		this.on("add", function(e) {
			view = new eUndac.Views.Admin_Roles({
				model: e
			})
		})
	}
}), eUndac.Collections.Rates = Backbone.Collection.extend({
	initialize: function(e) {
		e.id && (this.id = e.id), this.on("add", function(e) {
			view = new eUndac.Views.View_Rates({
				model: e
			})
		})
	},
	
	url: function() {
		return this.id ? "/rest/rate/id/" + this.id : "/rest/rate"
	},
	
	model: eUndac.Models.Rate
}), eUndac.Collections.CoursesConvalidation = Backbone.Collection.extend({
	initialize: function(e) {
		e.id && (this.id = e.id), this.on("add", function(e) {
			view = new eUndac.Views.List_CoursesConvalidation({
				model: e
			})
		})
	},
	
	url: function() {
		return this.id ? "/rest/listconvalidation/id/" + this.id : "/rest/listconvalidation"
	},
	
	model: eUndac.Models.Course
}), eUndac.Collections.Convalidations = Backbone.Collection.extend({
	initialize: function(e) {
		e.id && (this.id = e.id), this.on("add", function(e) {
			view = new eUndac.Views.Convalidation({
				model: e
			})
		})
	},
	
	url: function() {
		return this.id ? "/rest/convalidation/id/" + this.id : "/rest/convalidation"
	},
	
	model: eUndac.Models.Convalidation
}), eUndac.Views.Admin_Organizations = Backbone.View.extend({
	tagName: "article",
	className: "item-table   js-item",
	events: {
		"click .js_button-more-detail": "moreDetail",
		"click .js_button-back": "backToNoDetail",
		"click .js_button-edit": "editOrganization",
		"click .js_button-back_detail": "backToDetail",
		"click .js_button-delete": "toggleDeleteCape",
		"click .js_button-delete-cancel": "toggleDeleteCape",
		"submit .js_form-edit": "submitEditForm",
		"click .js_button-delete-confirm": "confirmDelete"
	},
	
	initialize: function() {
		var e = this;
		this.model.bind("change", function() {
			this.model.changed.success && setTimeout(function() {
				e.renderUpdate().afterRender(), e.model.set({
					success: !1
				})
			}, 2e3)
		}, this), this.template = swig.compile($("#template_organization").html()), template_organization_detail = swig.compile($("#template_organization-detail").html()), template_organization_edit = swig.compile($("#template_organization-edit").html()), this.template_msg_error = swig.compile($("#template_msg_error").html()), this.template_msg_success = swig.compile($("#template_msg_success").html()), this.template_msg_danger = swig.compile($("#template_msg_danger_update").html()), this.render().afterRender()
	},
	
	render: function() {
		var e = this.model.toJSON(),
			t = this.$el.html(this.template(e));
		return $(".js_group_active").append(t), $(".js_group_active").find("p.empty").fadeOut("fast"), this
	},
	
	afterRender: function() {
		var e = this.model.toJSON(),
			t = template_organization_detail(e);
		this.$el.find(".js_interactive_sections").append(t);
		var n = template_organization_edit(e);
		this.$el.find(".js_interactive_sections").append(n), this.$content_no_detail = this.$el.find(".js_section-no-detail"), this.$content_detail = this.$el.find(".js_section-detail"), this.$content_edit = this.$el.find(".js_section-edit"), this.$delete_cape = this.$el.find(".js_delete-cape"), this.$form = this.$el.find(".js_form-edit"), this.$messages_site = this.$el.find(".js_form_messages")
	},
	
	renderUpdate: function() {
		var e = this.model.toJSON();
		
		return this.$el.html(this.template(e)), this
	},
	
	moreDetail: function(e) {
		e.preventDefault(), toggleContent(this.$content_no_detail, this.$content_detail)
	},
	
	editOrganization: function(e) {
		e.preventDefault(), toggleContent(this.$content_detail, this.$content_edit)
	},
	
	backToDetail: function(e) {
		e.preventDefault(), toggleContent(this.$content_edit, this.$content_detail)
	},
	
	backToNoDetail: function(e) {
		e.preventDefault(), toggleContent(this.$content_detail, this.$content_no_detail)
	},
	
	submitEditForm: function(e) {
		e.preventDefault();
		
		var t = this.$form.serializeJSON();
		
		this.model.set(t), update(this.$form, this), this.searchForEmpty()
	},
	
	searchForEmpty: function() {
		setTimeout(function() {
			0 === $(".js_group_active").find("article").length && $(".js_group_active").find("p.empty").fadeIn("fast")
		}, 2200)
	},
	
	toggleDeleteCape: function(e) {
		e.preventDefault(), toggleDelete(this.$delete_cape)
	},
	
	confirmDelete: function(e) {
		e.preventDefault();
		
		var t = $(e.target);
		deleteItem(t, this), this.searchForEmpty()
	}
}), eUndac.Views.Organizarion_Form = Backbone.View.extend({
	events: {
		"click .js_button_cancel": "cancel",
		"submit form": "submitForm"
	},
	
	initialize: function(e) {
		this.template = e.template, template_msg_error = swig.compile($("#template_msg_error").html()), template_msg_success = swig.compile($("#template_msg_success").html()), template_msg_danger = swig.compile($("#template_msg_danger_new").html()), this.$content_new = $(".js_content_new"), this.$content_main = $(".js_content_main"), this.render().afterRender()
	},
	
	render: function() {
		var e = this.$el.html(this.template);
		return this.$content_new.html(e), this
	},
	
	afterRender: function() {
		this.$form = $(".js_form-organization-new")
	},
	
	cancel: function(e) {
		e.preventDefault(), changeContent(this.$content_new, this.$content_main)
	},
	
	submitForm: function(e) {
		e.preventDefault();
		
		var t = this,
			n = this.$form.serializeJSON(),
			i = new eUndac.Models.Organization(n),
			r = this.$form.find(".js_form_messages"),
			s = this.$form.find("input[type=submit]");
		s.val("Guardando....").attr("disabled", !0), i.save(null, {
			success: function(e, n) {
				n.success ? (e.set({
					idget: n.idget,
					success: !1
				}), n.render && t.collection.add(e), r.html(template_msg_success()), s.val("Guardado"), setTimeout(function() {
					changeContent(t.$content_new, t.$content_main), cleanForm(t.$form), s.removeAttr("disabled").val("Guardar"), r.html("")
				}, 2e3)) : (r.html(template_msg_error(n)), s.removeAttr("disabled").val("Guardar"))
			},
			
			error: function() {
				s.removeAttr("disabled").val("Guargar"), r.html(template_msg_danger())
			}
		})
	}
}), eUndac.Views.Course = Backbone.View.extend({
	tagName: "article",
	className: "item  item--blue",
	events: {
		"click .js_course_checkbox": "carryCourse"
	},
	
	initialize: function(e) {
		this.template = swig.compile($("#template_course").html()), template_section = swig.compile($("#template_group_semester").html()), this.course_data = this.model.toJSON(), this.course_data.typeRender = e.typeRender, this.$where_render = e.where_render, this.loadData()
	},
	
	render: function() {
		var e = this.template(this.course_data);
		this.$el.html(e), this.$where_render.children(".js_semester" + this.course_data.semester).find(".js_content-semester").append(this.$el.html(e))
	},
	
	renderGroup: function() {
		var e = template_section(this.course_data);
		this.$where_render.append(e), this.render()
	},
	
	loadData: function() {
		var e = this;
		setTimeout(function() {
			$(".js_button-pre").addClass("fadeUp");
			var t = e.model.toJSON().semester;
			e.$where_render.children(".js_semester" + t).hasClass("active") ? e.render() : e.renderGroup()
		}, 300)
	},
	
	carryCourse: function(e) {
		e.preventDefault();
		
		var t = $(e.currentTarget),
			n = t.siblings("input"),
			i = t.data(),
			r = this.model.collection.model_data_user.toJSON(),
			s = r.main_info.perid,
			o = s.substring(2, 3);
		this.updateCredits(n, i), "N" === o && this.checkAmountTotal(n, i)
	},
	
	updateCredits: function(e, t) {
		var n = $("#js_credits_current").data().credits,
			i = t.type,
			r = t.type_semester,
			s = t.code,
			o = t.turn,
			a = t.group_elective;
		$("[data-code=" + s + "]").each(function(e) {
			if ($(this).data().turn !== o && $(this).siblings("input").prop("checked")) {
				var t = $(this).data().credits;
				n -= t, $("#js_credits_current").data("credits", n).html(n), $(this).siblings("input").prop("checked", !1)
			}
		}), "E" === i && $("[data-type_semester=" + r + "]").each(function(e) {
			if ($(this).data().code !== s && $(this).data().group_elective == a && $(this).siblings("input").prop("checked")) {
				var t = $(this).data().credits;
				n -= t, $("#js_credits_current").data("credits", n).html(n), $(this).siblings("input").prop("checked", !1)
			}
		});
		
		var c = parseInt($("#js_period-assign").data().credits),
			l = t.credits;
		e.prop("checked") ? (n = parseInt(n) - parseInt(l), $("#js_credits_current").data("credits", n).html(n), e.prop("checked", !1), this.model.set({
			carry: !1
		})) : (n = parseInt(n) + parseInt(l), n <= c && ($("#js_credits_current").data("credits", n).html(n), e.prop("checked", !0), this.model.set({
			carry: !0
		})));
		var u = [];
		$(".js_course_checkbox").each(function(e) {
			$(this).siblings("input").prop("checked") && u.push({
				s_t: $(this).data().st,
				credits: $(this).data().credits,
				semester: $(this).data().semester,
				turn: $(this).data().turn,
				type: $(this).data().type
			})
		});
		
		var d, p = "-",
			f = [],
			h = [],
			m = 0;
		u.forEach(function(e) {
			e.s_t !== p && (d = 0, p = e.s_t, u.forEach(function(t) {
				e.s_t === t.s_t && (d += parseInt(t.credits))
			}), d >= m && (m = d), f.push({
				s_t: e.s_t,
				semester: e.semester,
				semester_roman: $("#js_credit" + e.s_t).data().semester_roman,
				turn: e.turn,
				type: e.type,
				credits_pick: d
			}), "X" !== e.type && h.push({
				s_t: e.s_t,
				semester: e.semester,
				credits_pick: d,
				credits: parseInt($("#js_credit" + e.s_t).data().credits) + 1
			}))
		});
		
		var g = 100;
		f.forEach(function(e) {
			e.credits_pick >= m && e.semester <= g && (g = e.semester, $("#js_period-assign").data("semester", e.semester).data("semester_roman", e.semester_roman))
		});
		
		var _ = this.model.collection.model_data_user.toJSON(),
			v = _.main_info.perid,
			y = v.substring(2, 3);
		h.forEach(function(e) {
			e.credits_pick >= m && e.semester <= g && (g = e.semester, "N" === y ? $("#js_period-assign").data("credits", "12").html("12") : $("#js_period-assign").data("credits", e.credits).html(e.credits))
		}), e.prop("checked") && (n = $("#js_credits_current").data().credits, c = $("#js_period-assign").data().credits, n > c && (n -= l, $("#js_credits_current").data("credits", n).html(n), e.prop("checked", !1), this.model.set({
			carry: !1
		})))
	},
	
	checkAmountTotal: function(e, t) {
		var n = parseInt(this.model.collection.model_data_payment.current_payment.rate_payment),
			i = this.model.collection.model_data_payment.current_payments_normal,
			r = 0,
			s = 0;
		if (i.forEach(function(e) {
			r += parseFloat(e.amount)
		}), $('input[type="checkbox"]').each(function(e, t) {
			if (this.checked) {
				var i = $(t).siblings("label"),
					r = i.attr("data-credits"),
					o = parseInt(r) * parseFloat(n);
				s += o
			}
		}), !(s <= r) && e.prop("checked")) {
			var o = t.credits;
			credits_current = $("#js_credits_current").data().credits, credits_assign = $("#js_period-assign").data().credits, credits_current -= o, $("#js_credits_current").data("credits", credits_current).html(credits_current), e.prop("checked", !1), this.model.set({
				carry: !1
			})
		}
	}
}), eUndac.Views.AutomaticRegister = Backbone.View.extend({
	tagName: "div",
	events: {
		"click .js_options_turnos": "eventTurnos",
		"click .js_firts_registration": "firstRegistration"
	},
	
	initialize: function(e) {
		var t = this;
		this.template = swig.compile($("#template_automatic_register").html()), this.template_paragraph = swig.compile($("#template_paragraphs_cachimbos").html()), this.template_error = swig.compile($("#template_error-cachimbos").html()), $.ajax({
			url: "/restglobal/turnosautomaticmin"
		}).done(function(e) {
			e.status ? (t.dataTurnos = e.dataTurnos, t.render()) : $("#js_main-data").html(t.template_error())
		}).fail(function() {
			console.log("error")
		})
	},
	
	render: function() {
		var e = null;
		switch (this.dataTurnos.length.toString()) {
			case "1":
				e = "12";
				break;
			case "2":
				e = "6";
				break;
			case "3":
				e = "4";
				break;
			case "4":
				e = "3";
				break;
			case "5":
				e = "2";
				break;
			default:
				e = "2"
		}
		var t = {
			data: this.dataTurnos,
			col_val: e
		},
			n = this.template(t);
		$("#js_paragraph").html(this.template_paragraph()), $("#js_main-data").html(this.$el.html(n))
	},
	
	eventTurnos: function(e) {
		var t = $(e.currentTarget);
		t.parents(".js_item-turno").removeClass("active"), $(".js_options_turnos").css("margin-top", "15px"), $(".js_options_turnos").css("box-shadow", "none"), t.css("margin-top", "2px"), t.css("box-shadow", "rgba(0, 0, 0, 0.278431) -5px 5px 15px 0px"), t.parents(".js_item-turno").addClass("active");
		var n = t.parents(".js_item-turno").attr("turno-val");
		$(".js_msg-turno-select").html("Ha seleccionado el Turno " + n + ". ")
	},
	
	firstRegistration: function() {
		if ($(".js_item-turno").hasClass("active")) {
			var e = $(".js_item-turno.active").attr("turno-val");
			e ? $.ajax({
				url: "/restglobal/savedcachimbomin",
				type: "POST",
				data: {
					turno: e
				}
			}).done(function(e) {
				e.status ? ($(".js_msg_alert_register").html('<h4 class="text-success"><b>Se realizó correctamente su MATRÍCULA </b></h4>'), setTimeout(function() {
					setTimeout(function() {
						$(".js_msg_alert_register").empty()
					}, 2e3), window.location.reload()
				}, 1e3)) : ($(".js_msg_alert_register").html('<h4 class="text-danger"><b>Ocurrió un error.<br>Elija otro turno ó Intente de nuevo...</b></h4>'), setTimeout(function() {
					$(".js_msg_alert_register").empty()
				}, 3e3))
			}).fail(function(e) {
				$(".js_msg_alert_register").html('<h4 class="text-danger"><b>Ocurrió un error. Intente de nuevo...</b></h4>'), setTimeout(function() {
					$(".js_msg_alert_register").empty()
				}, 3e3)
			}) : ($(".js_msg_alert_register").html('<h4 class="text-danger"><b>Primero tiene que seleccionar un TURNO.</b></h4>'), setTimeout(function() {
				$(".js_msg_alert_register").empty()
			}, 3e3))
		} else $(".js_msg_alert_register").html('<h4 class="text-danger"><b>Primero tiene que seleccionar un TURNO.</b></h4>'), setTimeout(function() {
			$(".js_msg_alert_register").empty()
		}, 3e3)
	}
}), eUndac.Views.Admin_Periods = Backbone.View.extend({
	tagName: "article",
	className: "item-table   js-item",
	events: {
		"click .js_button-more-detail": "moreDetail",
		"click .js_button-back": "backToNoDetail",
		"click .js_button-edit": "editPeriod",
		"click .js_button-back_detail": "backToDetail",
		"click .js_button-delete": "toggleDeleteCape",
		"click .js_button-delete-cancel": "toggleDeleteCape",
		"click .js_button-delete-confirm": "confirmDelete",
		"submit .js_form-edit": "submitEditForm"
	},
	
	initialize: function() {
		var e = this;
		this.model.bind("change", function() {
			this.model.changed.success && setTimeout(function() {
				e.model.changed.hard_render ? (e.render().afterRender(), e.model.set({
					hard_render: !1
				})) : e.renderUpdate().afterRender(), e.model.set({
					success: !1
				})
			}, 2e3)
		}, this), this.template = swig.compile($("#template_period").html()), template_period_detail = swig.compile($("#template_period-detail").html()), template_period_edit = swig.compile($("#template_period-edit").html()), this.template_msg_error = swig.compile($("#template_msg_error").html()), this.template_msg_success = swig.compile($("#template_msg_success").html()), this.template_msg_danger = swig.compile($("#template_msg_danger_update").html()), this.render().afterRender()
	},
	
	render: function() {
		var e = this.model.toJSON(),
			t = this.$el.html(this.template(e));
		return "A" === e.state ? ($(".js_group_active").append(t), $(".js_group_active").find("p.empty").fadeOut("fast")) : "T" === e.state ? ($(".js_group_temporary").append(t), $(".js_group_temporary").find("p.empty").fadeOut("fast")) : "C" === e.state && ($(".js_group_close").append(t), $(".js_group_close").find("p.empty").fadeOut("fast")), this
	},
	
	renderUpdate: function() {
		var e = this.model.toJSON();
		
		return this.$el.html(this.template(e)), this
	},
	
	afterRender: function() {
		var e = this.model.toJSON(),
			t = template_period_detail(e);
		this.$el.find(".js_interactive_sections").append(t);
		var n = template_period_edit(e);
		this.$el.find(".js_interactive_sections").append(n), $("input[js-type=date]").datepicker(), this.$content_no_detail = this.$el.find(".js_section-no-detail"), this.$content_detail = this.$el.find(".js_section-detail"), this.$content_edit = this.$el.find(".js_section-edit"), this.$delete_cape = this.$el.find(".js_delete-cape"), this.$form = this.$el.find(".js_form-edit"), this.$messages_site = this.$el.find(".js_form_messages")
	},
	
	moreDetail: function() {
		toggleContent(this.$content_no_detail, this.$content_detail)
	},
	
	editPeriod: function() {
		toggleContent(this.$content_detail, this.$content_edit)
	},
	
	backToDetail: function() {
		toggleContent(this.$content_edit, this.$content_detail)
	},
	
	backToNoDetail: function() {
		toggleContent(this.$content_detail, this.$content_no_detail)
	},
	
	submitEditForm: function(e) {
		e.preventDefault();
		
		var t = this.$form.serializeJSON();
		
		this.model.set(t, {
			wait: !0
		}), update(this.$form, this), this.searchForEmpty()
	},
	
	searchForEmpty: function() {
		setTimeout(function() {
			0 === $(".js_group_active").find("article").length && $(".js_group_active").find("p.empty").fadeIn("fast"), 0 === $(".js_group_temporary").find("article").length && $(".js_group_temporary").find("p.empty").fadeIn("fast"), 0 === $(".js_group_close").find("article").length && $(".js_group_close").find("p.empty").fadeIn("fast")
		}, 2200)
	},
	
	toggleDeleteCape: function() {
		toggleDelete(this.$delete_cape)
	},
	
	confirmDelete: function(e) {
		var t = $(e.target);
		deleteItem(t, this), this.searchForEmpty()
	}
}), eUndac.Views.Period_Form = Backbone.View.extend({
	events: {
		"click .js_button_cancel": "cancel",
		"submit form": "submitForm"
	},
	
	initialize: function(e) {
		this.template = e.template, this.template_msg_error = swig.compile($("#template_msg_error").html()), this.template_msg_success = swig.compile($("#template_msg_success").html()), this.template_msg_danger = swig.compile($("#template_msg_danger_new").html()), this.$content_new = $("#js_content_new"), this.$content_main = $(".js_content_main"), this.render().afterRender()
	},
	
	render: function() {
		var e = this.$el.html(this.template);
		return this.$content_new.html(e), this
	},
	
	afterRender: function() {
		this.$form = $(".js_form-period-new")
	},
	
	cancel: function() {
		changeContent(this.$content_new, this.$content_main)
	},
	
	submitForm: function(e) {
		e.preventDefault();
		
		var t = this.$form.serializeJSON(),
			n = new eUndac.Models.Period(t);
		saveNew(this.$form, n, this.collection, this)
	}
}), eUndac.Views.Admin_Facultys = Backbone.View.extend({
	tagName: "article",
	className: "item-table",
	events: {
		"click .js_button-more-detail": "moreDetail",
		"click .js_button-back": "backToNoDetail",
		"click .js_button-edit": "editFaculty",
		"click .js_button-back_detail": "backToDetail",
		"click .js_button-delete": "toggleDeleteCape",
		"click .js_button-delete-cancel": "toggleDeleteCape",
		"submit .js_form-edit": "submitEditForm",
		"click .js_button-delete-confirm": "confirmDelete"
	},
	
	initialize: function() {
		var e = this;
		this.model.bind("change", function() {
			this.model.changed.success && setTimeout(function() {
				e.model.changed.hard_render ? (e.render().afterRender(), e.model.set({
					hard_render: !1
				})) : e.renderUpdate().afterRender(), e.model.set({
					success: !1
				})
			}, 2e3)
		}, this), this.template = swig.compile($("#template_faculty").html()), template_faculty_detail = swig.compile($("#template_faculty-detail").html()), template_faculty_edit = swig.compile($("#template_faculty-edit").html()), this.template_msg_error = swig.compile($("#template_msg_error").html()), this.template_msg_success = swig.compile($("#template_msg_success").html()), this.template_msg_danger = swig.compile($("#template_msg_danger_update").html()), this.render().afterRender()
	},
	
	render: function() {
		var e = this.model.toJSON(),
			t = this.$el.html(this.template(e));
		return "A" === e.state ? ($(".js_group_active").append(t), $(".js_group_active").find("p.empty").fadeOut("fast")) : "I" === e.state && ($(".js_group_close").append(t), $(".js_group_close").find("p.empty").fadeOut("fast")), this
	},
	
	renderUpdate: function() {
		var e = this.model.toJSON();
		
		return this.$el.html(this.template(e)), this
	},
	
	afterRender: function() {
		var e = this.model.toJSON(),
			t = template_faculty_detail(e);
		this.$el.find(".js_interactive_sections").append(t);
		var n = template_faculty_edit(e);
		this.$el.find(".js_interactive_sections").append(n), this.$content_no_detail = this.$el.find(".js_section-no-detail"), this.$content_detail = this.$el.find(".js_section-detail"), this.$content_edit = this.$el.find(".js_section-edit"), this.$delete_cape = this.$el.find(".js_delete-cape"), this.$form = this.$el.find(".js_form-edit"), this.$messages_site = this.$el.find(".js_form_messages")
	},
	
	moreDetail: function(e) {
		e.preventDefault(), toggleContent(this.$content_no_detail, this.$content_detail)
	},
	
	editFaculty: function(e) {
		e.preventDefault(), toggleContent(this.$content_detail, this.$content_edit)
	},
	
	backToDetail: function(e) {
		e.preventDefault(), toggleContent(this.$content_edit, this.$content_detail)
	},
	
	backToNoDetail: function(e) {
		e.preventDefault(), toggleContent(this.$content_detail, this.$content_no_detail)
	},
	
	submitEditForm: function(e) {
		e.preventDefault();
		
		var t = this.$form.serializeJSON();
		
		this.model.set(t), update(this.$form, this), this.searchForEmpty()
	},
	
	searchForEmpty: function() {
		setTimeout(function() {
			0 === $(".js_group_active").find("article").length && $(".js_group_active").find("p.empty").fadeIn("fast"), 0 === $(".js_group_close").find("article").length && $(".js_group_close").find("p.empty").fadeIn("fast")
		}, 2200)
	},
	
	toggleDeleteCape: function(e) {
		e.preventDefault(), console.log("delete")
	},
	
	confirmDelete: function(e) {
		e.preventDefault();
		
		var t = $(e.target);
		deleteItem(t, this), this.searchForEmpty()
	}
}), eUndac.Views.Faculty_Form = Backbone.View.extend({
	events: {
		"click .js_button_cancel": "cancel",
		"submit form": "submitForm"
	},
	
	initialize: function(e) {
		this.template = e.template, template_msg_error = swig.compile($("#template_msg_error").html()), template_msg_success = swig.compile($("#template_msg_success").html()), template_msg_danger = swig.compile($("#template_msg_danger_new").html()), this.$content_new = $(".js_content_new"), this.$content_main = $(".js_content_main"), this.render().afterRender()
	},
	
	render: function() {
		var e = this.$el.html(this.template);
		return this.$content_new.html(e), this
	},
	
	afterRender: function() {
		this.$form = $(".js_form-faculty-new")
	},
	
	cancel: function(e) {
		e.preventDefault(), changeContent(this.$content_new, this.$content_main)
	},
	
	submitForm: function(e) {
		e.preventDefault();
		
		var t = this,
			n = this.$form.serializeJSON(),
			i = new eUndac.Models.Faculty(n),
			r = this.$form.find(".js_form_messages"),
			s = this.$form.find("input[type=submit]");
		s.val("Guardando...").attr("disabled", !0), i.save(null, {
			success: function(e, n) {
				n.success ? (e.set({
					idget: n.idget,
					success: !1
				}), n.render && t.collection.add(e), r.html(template_msg_success()), s.val("Guardado"), setTimeout(function() {
					changeContent(t.$content_new, t.$content_main), cleanForm(t.$form), s.removeAttr("disabled").val("Guardar"), r.html("")
				}, 2e3)) : (r.html(template_msg_error(n)), s.removeAttr("disabled").val("Guardar"))
			},
			
			error: function() {
				s.removeAttr("disabled").val("Guardar"), r.html(template_msg_danger())
			}
		})
	}
}), eUndac.Views.Admin_Subsidiarys = Backbone.View.extend({
	tagName: "article",
	className: "item-table   js-item",
	events: {
		"click .js_button-more-detail": "moreDetail",
		"click .js_button-back": "backToNoDetail",
		"click .js_button-edit": "editSubsidiary",
		"click .js_button-back_detail": "backToDetail",
		"submit .js_form-edit": "submitEditForm",
		"click .js_button-delete": "toggleDeleteCape",
		"click .js_button-delete-cancel": "toggleDeleteCape",
		"click .js_button-delete-confirm": "confirmDelete"
	},
	
	initialize: function() {
		var e = this;
		this.model.bind("change", function() {
			this.model.changed.success && setTimeout(function() {
				e.model.changed.hard_render ? (e.render().afterRender(), e.model.set({
					hard_render: !1
				})) : e.renderUpdate().afterRender(), e.model.set({
					success: !1
				})
			}, 2e3)
		}, this), this.template = swig.compile($("#template_subsidiary").html()), template_subsidiary_detail = swig.compile($("#template_subsidiary-detail").html()), template_subsidiary_edit = swig.compile($("#template_subsidiary-edit").html()), this.template_msg_error = swig.compile($("#template_msg_error").html()), this.template_msg_success = swig.compile($("#template_msg_success").html()), this.template_msg_danger = swig.compile($("#template_msg_danger_update").html()), this.render().afterRender()
	},
	
	render: function() {
		var e = this.model.toJSON(),
			t = this.$el.html(this.template(e));
		return "A" === e.state ? ($(".js_group_active").prepend(t), $(".js_group_active").find("p.empty").fadeOut("fast")) : "I" === e.state && ($(".js_group_close").prepend(t), $(".js_group_close").find("p.empty").fadeOut("fast")), this
	},
	
	renderUpdate: function() {
		var e = this.model.toJSON();
		
		return this.$el.html(this.template(e)), this
	},
	
	moreDetail: function(e) {
		e.preventDefault(), toggleContent(this.$content_no_detail, this.$content_detail)
	},
	
	backToNoDetail: function(e) {
		e.preventDefault(), toggleContent(this.$content_detail, this.$content_no_detail)
	},
	
	afterRender: function() {
		var e = this.model.toJSON(),
			t = template_subsidiary_detail(e);
		this.$el.find(".js_interactive_sections").append(t);
		var n = template_subsidiary_edit(e);
		this.$el.find(".js_interactive_sections").append(n), this.$content_no_detail = this.$el.find(".js_section-no-detail"), this.$content_detail = this.$el.find(".js_section-detail"), this.$content_edit = this.$el.find(".js_section-edit"), this.$delete_cape = this.$el.find(".js_delete-cape"), this.$form = this.$el.find(".js_form-edit"), this.$messages_site = this.$el.find(".js_form_messages")
	},
	
	editSubsidiary: function(e) {
		e.preventDefault(), toggleContent(this.$content_detail, this.$content_edit)
	},
	
	backToDetail: function(e) {
		e.preventDefault(), toggleContent(this.$content_edit, this.$content_detail)
	},
	
	submitEditForm: function(e) {
		e.preventDefault();
		
		var t = this.$form.serializeJSON();
		
		this.model.set(t), update(this.$form, this), this.searchForEmpty()
	},
	
	searchForEmpty: function() {
		setTimeout(function() {
			0 === $(".js_group_active").find("article").length && $(".js_group_active").find("p.empty").fadeIn("fast"), 0 === $(".js_group_close").find("article").length && $(".js_group_close").find("p.empty").fadeIn("fast")
		}, 2200)
	},
	
	toggleDeleteCape: function(e) {
		e.preventDefault(), toggleDelete(this.$delete_cape)
	},
	
	confirmDelete: function(e) {
		e.preventDefault();
		
		var t = $(e.target);
		deleteItem(t, this), this.searchForEmpty()
	}
}), eUndac.Views.Subsidiary_Form = Backbone.View.extend({
	events: {
		"click .js_button_cancel": "cancel",
		"submit form": "submitForm"
	},
	
	initialize: function(e) {
		this.template = e.template, template_msg_error = swig.compile($("#template_msg_error").html()), template_msg_success = swig.compile($("#template_msg_success").html()), template_msg_danger = swig.compile($("#template_msg_danger_new").html()), this.$content_new = $(".js_content_new"), this.$content_main = $(".js_content_main"), this.render().afterRender()
	},
	
	render: function() {
		var e = this.$el.html(this.template);
		return this.$content_new.html(e), this
	},
	
	afterRender: function() {
		this.$form = $(".js_form-subsidiary-new")
	},
	
	cancel: function(e) {
		e.preventDefault(), changeContent(this.$content_new, this.$content_main)
	},
	
	submitForm: function(e) {
		e.preventDefault();
		
		var t = this,
			n = this.$form.serializeJSON(),
			i = new eUndac.Models.Subsidiary(n),
			r = this.$form.find(".js_form_messages"),
			s = this.$form.find("input[type=submit]");
		console.log("data a guardar", i), s.val("Guardando...").attr("disabled", !0), i.save(null, {
			success: function(e, n) {
				n.success ? (console.log("guardado"), e.set({
					idget: n.idget,
					success: !1
				}), n.render && t.collection.add(e), r.html(template_msg_success()), s.val("Guardado"), setTimeout(function() {
					changeContent(t.$content_new, t.$content_main), cleanForm(t.$form), s.removeAttr("disabled").val("Guardar"), r.html("")
				}, 2e3)) : (r.html(template_msg_error(n)), s.removeAttr("disabled").val("Guardar"))
			},
			
			error: function() {
				s.removeAttr("disabled").val("Guardar"), r.html(template_msg_danger())
			}
		})
	}
}), eUndac.Views.Header_Parent = Backbone.View.extend({
	events: {
		"click .js_button-cancel-speciality": "cancelSpeciality",
		"click .js_button_new_speciality": "newSpeciality"
	},
	
	initialize: function(e) {
		this.parents = e.parentsss, this.data_facid = e.facid, this.data_subid = e.subid, this.$content_input = e.content_input, this.$content_admin_speciality = $(".js_content_admin_speciality"), this.template_parent = swig.compile(e.template.html()), this.data_school = e.data_school, this.render()
	},
	
	render: function() {
		var e = this.$el.html(this.template_parent(this.data_school));
		$(".js_content_admin_speciality").html(e);
		var t = new eUndac.Collections.Speciality({
			id: this.data_school.idget
		});
		
		return t.facid = this.data_facid, t.subid = this.data_subid, t.parents = this.parents, this.$collection = t, chargeContent(this.$content_admin_speciality, t), changeContent(this.$content_input, this.$content_admin_speciality), this
	},
	
	cancelSpeciality: function(e) {
		e.preventDefault(), toggleContent(this.$content_admin_speciality, $(".js_content_main"))
	},
	
	newSpeciality: function(e) {
		e.preventDefault();
		
		new eUndac.Views.Speciality_Form({
			template: $("#content_new_speciality").html(),
			collection: this.$collection
		});
		
		$("#facid_spe").empty(), $("#parent_spe").html("");
		for (var t = this.data_facid, n = $(".js_selectfacid").val(), i = 0; i < t.length; i++) n == t[i].idget && $("#facid_spe").append("<option value=" + t[i].idget + ' selected="selected">' + t[i].name + "</option>");
		for (var r = this.data_subid, i = 0; i < r.length; i++)"A" == r[i].state && "1000" != r[i].subid && "0000" != r[i].subid && $("#subid_spe").append("<option value=" + r[i].idget + ">" + r[i].name + "</option>");
		var s = this.data_school.idget,
			o = this.parents;
		o.forEach(function(e) {
			"A" == e.toJSON().state && s == e.toJSON().idget && $("#parent_spe").append("<option value=" + e.toJSON().idget + ">" + e.toJSON().name + "</option>")
		}), changeContent(this.$content_admin_speciality, $(".js_content_new_speciality"))
	}
}), eUndac.Views.Parent = Backbone.View.extend({
	tagName: "article",
	className: "item-table js-item",
	events: {
		"click .js_button-more-detail_spe": "moreDetailspe",
		"click .js_button-back-spe": "backToNoDetailspe",
		"click .js_button-edit-spe": "editSchoolspe",
		"click .js_button-back_detail-spe": "backToDetailspe",
		"click .js_button-delete-spe": "toggleDeleteCapespe",
		"click .js_button-delete-cancel-spe": "toggleDeleteCapespe",
		"click .js_button-delete-confirm-spe": "confirmDeletespe",
		"submit .js_form-edit-spe": "submitEditFormspe"
	},
	
	initialize: function() {
		var e = this;
		this.model.bind("change", function() {
			this.model.changed.success && setTimeout(function() {
				e.model.changed.hard_render ? (e.render().afterRender(), e.model.set({
					hard_render: !1
				})) : e.renderUpdate().afterRender(), e.model.set({
					success: !1
				})
			}, 2e3)
		}, this), this.template_speciality = swig.compile($("#template_speciality").html()), template_speciality_detail = swig.compile($("#template_speciality-detail").html()), template_speciality_edit = swig.compile($("#template_speciality-edit").html()), this.template_msg_error = swig.compile($("#template_msg_error").html()), this.template_msg_success = swig.compile($("#template_msg_success").html()), this.template_msg_danger = swig.compile($("#template_msg_danger_update").html()), this.render().afterRender()
	},
	
	render: function() {
		var e = this.model.toJSON(),
			t = this.$el.html(this.template_speciality(e));
		return "A" === e.state ? ($(".js_group_active_spe").append(t), $(".js_group_active_spe").find("p.empty").fadeOut("fast")) : "I" === e.state && ($(".js_group_close_spe").append(t), $(".js_group_close_spe").find("p.empty").fadeOut("fast")), this
	},
	
	renderUpdate: function() {
		var e = this.model.toJSON();
		
		return this.$el.html(this.template_speciality(e)), this
	},
	
	afterRender: function() {
		var e = this.model.toJSON(),
			t = e.code_spe,
			n = e.subid_spe,
			i = template_speciality_detail(e);
		this.$el.find(".js_interactive_sections").append(i);
		var r = template_speciality_edit(e);
		this.$el.find(".js_interactive_sections").append(r);
		for (var s = this.model.collection.facid, o = 0; o < s.length; o++) e.facid_spe == s[o].idget && $("#facid_spe" + t).append("<option value=" + s[o].idget + ' selected="selected">' + s[o].name + "</option>");
		$("#subid_spe" + t).empty();
		
		for (var a = this.model.collection.subid, o = 0; o < a.length; o++)"A" == a[o].state && "1000" != a[o].subid && "0000" != a[o].subid && (n == a[o].idget ? $("#subid_spe" + t).append("<option value=" + a[o].idget + ' selected="selected">' + a[o].name + "</option>") : $("#subid_spe" + t).append("<option value=" + a[o].idget + ">" + a[o].name + "</option>"));
		$("#parent_spe" + t).html("");
		var c = this.model.collection.id,
			l = this.model.collection.parents;
		l.forEach(function(e) {
			"A" == e.toJSON().state && c == e.toJSON().idget && $("#parent_spe" + t).append("<option value=" + e.toJSON().idget + ">" + e.toJSON().name + "</option>")
		}), this.$content_no_detail = this.$el.find(".js_section-no-detail-spe"), this.$content_detail = this.$el.find(".js_section-detail-spe"), this.$content_edit = this.$el.find(".js_section-edit-spe"), this.$delete_cape = this.$el.find(".js_delete-cape"), this.$form = this.$el.find(".js_form-edit-spe"), this.$messages_site = this.$el.find(".js_form_messages"), this.model.set({
			success: !1
		}, {
			silent: !0
		})
	},
	
	moreDetailspe: function(e) {
		e.preventDefault(), toggleContent(this.$content_no_detail, this.$content_detail)
	},
	
	editSchoolspe: function(e) {
		e.preventDefault(), toggleContent(this.$content_detail, this.$content_edit)
	},
	
	backToDetailspe: function(e) {
		e.preventDefault(), toggleContent(this.$content_edit, this.$content_detail)
	},
	
	backToNoDetailspe: function(e) {
		e.preventDefault(), toggleContent(this.$content_detail, this.$content_no_detail)
	},
	
	toggleDeleteCapespe: function(e) {
		e.preventDefault(), toggleDelete(this.$delete_cape)
	},
	
	confirmDeletespe: function(e) {
		e.preventDefault();
		
		var t = $(e.target);
		deleteItem(t, this), this.searchForEmpty()
	},
	
	searchForEmpty: function() {
		setTimeout(function() {
			0 === $(".js_group_active_spe").find("article").length && $(".js_group_active_spe").find("p.empty").fadeIn("fast"), 0 === $(".js_group_close_spe").find("article").length && $(".js_group_close_spe").find("p.empty").fadeIn("fast")
		}, 2200)
	},
	
	submitEditFormspe: function(e) {
		e.preventDefault();
		
		var t = this.$form.serializeJSON();
		
		this.model.set(t, {
			wait: !0
		}), update(this.$form, this), this.searchForEmpty()
	}
}), eUndac.Views.School_View = Backbone.View.extend({
	tagName: "article",
	className: "item-table js-item",
	events: {
		"click .js_button-more-detail": "moreDetail",
		"click .js_button-back": "backToNoDetail",
		"click .js_button-edit": "editSchool",
		"click .js_button-back_detail": "backToDetail",
		"click .js_button-delete": "toggleDeleteCape",
		"click .js_button-delete-cancel": "toggleDeleteCape",
		"click .js_button-delete-confirm": "confirmDelete",
		"click .js_button-admin-specility": "adminSpeciality",
		"submit .js_form-edit": "submitEditForm"
	},
	
	initialize: function() {
		var e = this;
		this.model.bind("change", function() {
			this.model.changed.success && setTimeout(function() {
				e.model.changed.hard_render ? (e.render().afterRender(), e.model.set({
					hard_render: !1
				})) : e.renderUpdate().afterRender(), e.model.set({
					success: !1
				})
			}, 2e3)
		}, this), this.template = swig.compile($("#template_school").html()), template_school_detail = swig.compile($("#template_school-detail").html()), template_school_edit = swig.compile($("#template_school-edit").html()), this.template_msg_error = swig.compile($("#template_msg_error").html()), this.template_msg_success = swig.compile($("#template_msg_success").html()), this.template_msg_danger = swig.compile($("#template_msg_danger_update").html()), this.render().afterRender()
	},
	
	render: function() {
		var e = this.model.toJSON(),
			t = this.$el.html(this.template(e));
		return "A" === e.state ? ($(".js_group_active").append(t), $(".js_group_active").find("p.empty").fadeOut("fast")) : "I" === e.state && ($(".js_group_close").append(t), $(".js_group_close").find("p.empty").fadeOut("fast")), this
	},
	
	renderUpdate: function() {
		var e = this.model.toJSON();
		
		return this.$el.html(this.template(e)), this
	},
	
	afterRender: function() {
		var e = this.model.toJSON(),
			t = e.code,
			n = e.subid,
			i = template_school_detail(e);
		this.$el.find(".js_interactive_sections").append(i);
		var r = template_school_edit(e);
		this.$el.find(".js_interactive_sections").append(r);
		for (var s = this.model.collection.facid, o = 0; o < s.length; o++) e.facid == s[o].idget && $("#facid" + t).append("<option value=" + s[o].idget + ' selected="selected">' + s[o].name + "</option>");
		$("#subid" + t).empty();
		
		for (var a = this.model.collection.subid, o = 0; o < a.length; o++)"A" == a[o].state && "1000" != a[o].subid && "0000" != a[o].subid && (n == a[o].idget ? $("#subid" + t).append("<option value=" + a[o].idget + ' selected="selected">' + a[o].name + "</option>") : $("#subid" + t).append("<option value=" + a[o].idget + ">" + a[o].name + "</option>"));
		this.$content_no_detail = this.$el.find(".js_section-no-detail"), this.$content_detail = this.$el.find(".js_section-detail"), this.$content_edit = this.$el.find(".js_section-edit"), this.$delete_cape = this.$el.find(".js_delete-cape"), this.$form = this.$el.find(".js_form-edit"), this.$messages_site = this.$el.find(".js_form_messages")
	},
	
	moreDetail: function(e) {
		e.preventDefault(), toggleContent(this.$content_no_detail, this.$content_detail)
	},
	
	editSchool: function(e) {
		e.preventDefault(), toggleContent(this.$content_detail, this.$content_edit)
	},
	
	backToDetail: function(e) {
		e.preventDefault(), toggleContent(this.$content_edit, this.$content_detail)
	},
	
	backToNoDetail: function(e) {
		e.preventDefault(), toggleContent(this.$content_detail, this.$content_no_detail)
	},
	
	toggleDeleteCape: function(e) {
		e.preventDefault(), toggleDelete(this.$delete_cape)
	},
	
	confirmDelete: function(e) {
		e.preventDefault();
		
		var t = $(e.target);
		deleteItem(t, this), this.searchForEmpty()
	},
	
	searchForEmpty: function() {
		setTimeout(function() {
			0 === $(".js_group_active").find("article").length && $(".js_group_active").find("p.empty").fadeIn("fast"), 0 === $(".js_group_close").find("article").length && $(".js_group_close").find("p.empty").fadeIn("fast")
		}, 2200)
	},
	
	submitEditForm: function(e) {
		e.preventDefault();
		
		var t = this.$form.serializeJSON();
		
		this.model.set(t, {
			wait: !0
		}), update(this.$form, this), this.searchForEmpty()
	},
	
	adminSpeciality: function(e) {
		e.preventDefault();
		
		var t = this.model.toJSON();
		
		new eUndac.Views.Header_Parent({
			template: $("#template_header_specialitys"),
			data_school: t,
			facid: this.model.collection.facid,
			subid: this.model.collection.subid,
			parentsss: this.model.collection.models,
			content_input: $(".js_content_main")
		})
	}
}), eUndac.Views.School_Form = Backbone.View.extend({
	events: {
		"click .js_button_cancel": "cancel",
		"submit form": "submitForm"
	},
	
	initialize: function(e) {
		this.template = e.template, this.template_msg_error = swig.compile($("#template_msg_error").html()), this.template_msg_success = swig.compile($("#template_msg_success").html()), this.template_msg_danger = swig.compile($("#template_msg_danger_new").html()), this.$content_new = $(".js_content_new"), this.$content_main = $(".js_content_main"), this.render().afterRender()
	},
	
	render: function() {
		var e = this.$el.html(this.template);
		return this.$content_new.html(e), this
	},
	
	afterRender: function() {
		this.$form = $(".js_form-schools-new")
	},
	
	cancel: function(e) {
		e.preventDefault(), changeContent(this.$content_new, this.$content_main)
	},
	
	submitForm: function(e) {
		e.preventDefault();
		
		var t = this.$form.find(".js_form_messages"),
			n = this.$form.find("input[type=submit]"),
			i = this,
			r = this.$form.serializeJSON(),
			s = new eUndac.Models.School(r);
		s.save(null, {
			success: function(e, r) {
				r.success ? (i.collection.add(e), e.set({
					idget: r.idget,
					success: !1
				}), t.html(i.template_msg_success()), n.val("Guardado"), setTimeout(function() {
					changeContent(i.$content_new, i.$content_main), cleanForm(i.$form), $("#subid option[value='']").attr("selected", !0), n.removeAttr("disabled").val("Guardar"), t.html("")
				}, 2e3)) : (t.html(i.template_msg_error(r)), n.removeAttr("disabled").val("Guardar"))
			},
			
			error: function() {
				n.removeAttr("disabled").val("Guardar"), t.html(i.template_msg_danger())
			}
		})
	}
}), eUndac.Views.Speciality_Form = Backbone.View.extend({
	events: {
		"click .js_button_cancel_spe": "cancel",
		"submit form": "submitForm"
	},
	
	initialize: function(e) {
		this.template = e.template, this.template_msg_error = swig.compile($("#template_msg_error").html()), this.template_msg_success = swig.compile($("#template_msg_success").html()), this.template_msg_danger = swig.compile($("#template_msg_danger_new").html()), this.$content_new_speciality = $(".js_content_new_speciality"), this.$content_admin_speciality = $(".js_content_admin_speciality"), this.render().afterRender()
	},
	
	render: function() {
		var e = this.$el.html(this.template);
		return this.$content_new_speciality.html(e), this
	},
	
	afterRender: function() {
		this.$form = $(".js_form-speciality-new")
	},
	
	cancel: function(e) {
		e.preventDefault(), changeContent(this.$content_new_speciality, this.$content_admin_speciality)
	},
	
	submitForm: function(e) {
		e.preventDefault();
		
		var t = this.$form.find(".js_form_messages"),
			n = this.$form.find("input[type=submit]"),
			i = this,
			r = this.$form.serializeJSON(),
			s = new eUndac.Models.Speciality(r);
		s.save(null, {
			success: function(e, r) {
				if (r.success) {
					var s = i.collection.parents,
						o = i.collection.id;
					s.forEach(function(e) {
						e.id == o && e.set({
							especiality: "SI",
							success: !0
						})
					}), i.collection.add(e), e.set({
						idget: r.idget,
						success: !1
					}), t.html(i.template_msg_success()), n.val("Guardado"), setTimeout(function() {
						changeContent(i.$content_new_speciality, i.$content_admin_speciality), cleanForm(i.$form), $("#subid_spe option[value='']").attr("selected", !0), n.removeAttr("disabled").val("Guardar"), t.html("")
					}, 2e3)
				} else t.html(i.template_msg_error(r)), n.removeAttr("disabled").val("Guardar")
			},
			
			error: function() {
				n.removeAttr("disabled").val("Guardar"), t.html(i.template_msg_danger())
			}
		})
	}
}), eUndac.Views.Interaction_Person = Backbone.View.extend({
	tagName: "header",
	className: "content__header  content__header--interaction",
	events: {
		"click  .js_button_search": "search",
		keypress: "keyaction"
	},
	
	initialize: function(e) {
		this.template = e.template, this.template_person = swig.compile(this.template.html()), this.render()
	},
	
	render: function() {
		var e = this.template_person();
		
		return $(".js_content_main").prepend(this.$el.html(e)), this
	},
	
	search: function(e) {
		function t() {
			o.fetch({
				success: function(e, t) {
					n.children(".js-spinner").addClass("fadeOut"), setTimeout(function() {
						n.children(".js-spinner").removeClass("fadeUp fadeOut"), n.children(".js-group_interactive").addClass("active")
					}, 300), 0 == e.length && (8 == s && 10 != s ? (n.children(".js-group_interactive").find(".js-empty_group").html("<span class='glyphicon glyphicon-exclamation-sign'></span> La persona no se encuenta en el sistema. Puede crearlo si desea..."), setTimeout(function() {
						r.newPerson(i)
					}, 3e3)) : (n.children(".js-group_interactive").find(".js-empty_group").html("<span class='glyphicon glyphicon-exclamation-sign'></span> El código no exite. Ingrese un Código CORRECTO..."), $(".js-group_interactive").removeClass("active"), $(".js-group_interactive").addClass("active"), setTimeout(function() {
						$(".js-group_interactive").removeClass("active")
					}, 2300), $(".js_value_person").focus()))
				},
				
				error: function() {
					n.children(".js-spinner").addClass("fadeOut"), setTimeout(function() {
						n.children(".js-spinner").removeClass("fadeUp fadeOut"), n.children(".js-group_interactive").addClass("active")
					}, 300)
				}
			})
		}
		e.preventDefault();
		
		var n = $(".js_content_body"),
			i = $(".js_value_person").val(),
			r = this;
		if (i) {
			var s = i.length;
			if (s >= 8) {
				var o = new eUndac.Collections.Persons({
					id: i
				});
				
				n.children(".js-group_interactive").hasClass("active") || n.children(".js-spinner").addClass("fadeUp"), n.children(".js-group_interactive").addClass("inactive"), setTimeout(function() {
					n.children(".js-spinner").addClass("fadeUp"), n.children(".js-group_interactive").removeClass("active inactive"), n.children(".js-group_interactive").find(".js-item").remove(), n.children(".js-group_interactive").find(".js-empty_group").slideDown("fast"), t()
				}, 300)
			} else n.children(".js-group_interactive").find(".js-item").remove(), n.children(".js-group_interactive").find(".js-empty_group").html("<span class='glyphicon glyphicon-exclamation-sign'></span> Ingrese un DNI o un Código CORRECTO..."), $(".js-group_interactive").hasClass("active") || $(".js-group_interactive").addClass("active"), $(".js-empty_group").slideDown("fast"), setTimeout(function() {
				$(".js-group_interactive").removeClass("active")
			}, 2300), $(".js_value_person").focus()
		} else n.children(".js-group_interactive").find(".js-item").remove(), n.children(".js-group_interactive").find(".js-empty_group").html("<span class='glyphicon glyphicon-exclamation-sign'></span> Ingrese un DNI o un Código..."), $(".js-group_interactive").hasClass("active") || $(".js-group_interactive").addClass("active"), $(".js-empty_group").slideDown("fast"), setTimeout(function() {
			$(".js-group_interactive").removeClass("active")
		}, 2300), $(".js_value_person").focus()
	},
	
	keyaction: function(e) {
		13 != e && 13 != e.which && 0 != e.which || this.search(e)
	},
	
	newPerson: function(e) {
		var t = new eUndac.Collections.Persons({
			id: null
		});
		
		new eUndac.Views.Person_Form({
			template: $("#js_content_new").html(),
			pid: e,
			collection: t
		});
		
		changeContent($(".js_content_main"), $(".js_content_new"))
	}
}), eUndac.Views.Person_Form = Backbone.View.extend({
	events: {
		"click .js_button_cancel": "cancel",
		"submit form": "submitForm"
	},
	
	initialize: function(e) {
		this.pid = e.pid, this.template = e.template, this.template_msg_error = swig.compile($("#template_msg_error").html()), this.template_msg_success = swig.compile($("#template_msg_success").html()), this.template_msg_danger = swig.compile($("#template_msg_danger_new").html()), this.$content_new = $(".js_content_new"), this.$content_main = $(".js_content_main"), this.render().afterRender()
	},
	
	render: function() {
		var e = this.$el.html(this.template);
		return this.$content_new.html(e), this
	},
	
	afterRender: function() {
		this.$form = $(".js_form-person-new"), $("#pid").val(this.pid), $("#numdoc").val(this.pid), $("#birthday[js-type=date]").datepicker()
	},
	
	cancel: function(e) {
		e.preventDefault(), $(".js_content_body").children(".js-spinner").removeClass("fadeUp fadeOut"), $(".js_content_body").children(".js-group_interactive").removeClass("active inactive"), changeContent(this.$content_new, this.$content_main)
	},
	
	submitForm: function(e) {
		e.preventDefault();
		
		var t = this.$form.find(".js_form_messages"),
			n = this.$form.find("input[type=submit]"),
			i = this,
			r = this.$form.serializeJSON(),
			s = new eUndac.Models.Person(r);
		s.save(null, {
			success: function(e, r) {
				r.success ? (i.collection.add(e), e.set({
					idget: r.idget,
					success: !1
				}), t.html(i.template_msg_success()), n.val("Guardado"), setTimeout(function() {
					changeContent(i.$content_new, i.$content_main), cleanForm(i.$form), $("#subid_spe option[value='']").attr("selected", !0), n.removeAttr("disabled").val("Guardar"), t.html("")
				}, 2e3)) : (t.html(i.template_msg_error(r)), n.removeAttr("disabled").val("Guardar"))
			},
			
			error: function() {
				n.removeAttr("disabled").val("Guardar"), t.html(i.template_msg_danger())
			}
		})
	}
}), eUndac.Views.Person_View = Backbone.View.extend({
	tagName: "article",
	className: "item-person js-item",
	events: {
		"click .js_button-more-detail": "moreDetail",
		"click .js_button-edit": "editPerson",
		"click .js_button-back_edit": "cancelEditperson",
		"click .js_new_user": "newUser",
		"click .js_confirm_save_user": "confirmNewuser",
		"submit .js_form_new_user": "confirmNewuser",
		"submit .js_form-edit-person": "submitEditForm",
		"keydown .js_input_select": "selectSchoolandSubsidiary"
	},
	
	initialize: function() {
		var e = this;
		this.model.bind("change", function() {
			this.model.changed.success && setTimeout(function() {
				e.model.changed.hard_render ? (e.render().afterRender(), e.model.set({
					hard_render: !1,
					success: !1
				})) : e.renderUpdate().afterRender(), e.model.set({
					success: !1
				})
			}, 2e3)
		}, this), this.template = swig.compile($("#template_person").html()), template_person_edit = swig.compile($("#template_person-edit").html()), this.template_msg_error = swig.compile($("#template_msg_error").html()), this.template_msg_success = swig.compile($("#template_msg_success").html()), this.template_msg_danger = swig.compile($("#template_msg_danger_update").html()), this.render().afterRender()
	},
	
	render: function() {
		var e = this.model.toJSON(),
			t = this.$el.html(this.template(e));
		$(".js_group_active").append(t), $(".js_group_active").find("p.empty").fadeOut("fast");
		var n = $(".js_value_person").val(),
			i = new eUndac.Collections.Users({
				id: n
			});
		
		return chargeContent($(".js_content_body_user"), i), this.collection_users = i, this
	},
	
	afterRender: function() {
		var e = this.model.toJSON(),
			t = template_person_edit(e);
		this.$el.find(".section_edit_person").html(t), $("#birthday[js-type=date]").datepicker(), $("#sex     option[value=" + e.sex + "]").attr("selected", "selected"), $("#typedoc option[value=" + e.typedoc + "]").attr("selected", "selected"), $("#civil   option[value=" + e.civil + "]").attr("selected", "selected"), this.$content_main = this.$el.find("#js_view_main_person"), this.$content_edit = this.$el.find("#js_view_edit_person"), this.$delete_cape = this.$el.find(".js_delete-cape"), this.$form_new = this.$el.find(".js_form_new_user"), this.$form = this.$el.find(".js_form-edit-person"), this.$messages_site = this.$el.find(".js_form_messages")
	},
	
	renderUpdate: function() {
		var e = this.model.toJSON(),
			t = this.$el.html(this.template(e));
		$(".js_group_active").append(t), $(".js_group_active").find("p.empty").fadeOut("fast");
		var n = $(".js_value_person").val(),
			i = new eUndac.Collections.Users({
				id: n
			});
		
		return chargeContent($(".js_content_body_user"), i), this
	},
	
	moreDetail: function(e) {
		e.preventDefault(), singleToggleContent($(".js_person_more_info"))
	},
	
	editPerson: function(e) {
		e.preventDefault(), toggleContent(this.$content_main, this.$content_edit)
	},
	
	cancelEditperson: function(e) {
		e.preventDefault(), toggleContent(this.$content_edit, this.$content_main)
	},
	
	submitEditForm: function(e) {
		e.preventDefault();
		
		var t = this.$form.serializeJSON();
		
		this.model.set(t, {
			wait: !0
		}), update(this.$form, this)
	},
	
	newUser: function(e) {
		e.preventDefault(), $(".js_select_roles").val(""), $(".js_input_select").val(""), $(".js_coment_user").val(""), singleToggleContent($(".js_toggle_user_new"))
	},
	
	selectSchoolandSubsidiary: function() {
		smartInput($("#js-input_smart"))
	},
	
	confirmNewuser: function(e) {
		e.preventDefault();
		
		var t = this,
			n = $(".js_select_roles").val(),
			i = $(".js_input_select").val();
		
		this.$form_new.find(".js_form_messages");
		if (!n) return $(".js_form_messages").html("<p class='text-center text-danger'><span class='glyphicon glyphicon-exclamation-sign'></span><b> Seleccione un rol</b></p>"), setTimeout(function() {
			$(".js_form_messages").empty()
		}, 2e3), !1;
		if (!i) return $(".js_form_messages").html("<p class='text-center text-danger'><span class='glyphicon glyphicon-exclamation-sign'></span><b> Es necesario una escuela</b></p>"), setTimeout(function() {
			$(".js_form_messages").empty()
		}, 2e3), !1;
		var r = this.$form_new.find(".js_confirm_save_user"),
			s = this.$form_new.serializeJSON(),
			o = new eUndac.Models.User(s);
		o.set({
			pid: this.model.toJSON().pid
		}), o.save(null, {
			success: function(n, i) {
				i.success ? ($(".js_form_messages").html("<p class='text-center text-success'><span class='glyphicon glyphicon-ok'></span><b> Se agregó con éxito.</b></p>"), r.addClass("active"), t.collection_users.add(n), n.set({
					idget: i.idget,
					success: !1
				}), setTimeout(function() {
					r.val("Guardado ")
				}, 1500), setTimeout(function() {
					r.removeClass("active"), r.removeAttr("disabled").val("Agregar Usuario"), $(".js_form_messages").empty(), t.newUser(e)
				}, 2e3)) : ($(".js_form_messages").html("<p class='text-center text-danger'><span class='glyphicon glyphicon-exclamation-sign'></span><b> Hubo un error al guardar. Intente de nuevo...</b></p>"), setTimeout(function() {
					$(".js_form_messages").empty()
				}, 2e3))
			},
			
			error: function() {
				$(".js_form_messages").html("<p class='text-center text-danger'><span class='glyphicon glyphicon-exclamation-sign'></span><b> Hubo un error al parecer extraño. Intente mas tarde...</b></p>"), setTimeout(function() {
					$(".js_form_messages").empty()
				}, 2e3)
			}
		})
	}
}), eUndac.Views.User_View = Backbone.View.extend({
	tagName: "article",
	className: "item-user js-item",
	events: {
		"click .js_asign_director": "asignationDirector",
		"click .js_cancel_change_director": "cancelAsignationDirector",
		"click .js_accept_change_director": "aceptAsignationDirector",
		"click .js_change_password": "changePassword",
		"click .js_confirm_change_password": "confirmPassword",
		"click  input:radio": "changeState",
		"click .js_cancel_change_state": "cancelChangestate",
		"click .js_acept_change_state": "aceptChangestate",
		"click .js_new_user": "newUser"
	},
	
	initialize: function() {
		var e = this;
		this.model.bind("change", function() {
			this.model.changed.success && setTimeout(function() {
				e.model.changed.hard_render ? (e.render().afterRender(), e.model.set({
					hard_render: !1,
					success: !1
				})) : e.renderUpdate().afterRender(), e.model.set({
					success: !1
				})
			}, 2e3)
		}, this), this.template = swig.compile($("#template_user").html()), this.render().afterRender()
	},
	
	render: function() {
		var e = this.model.toJSON(),
			t = this.$el.html(this.template(e));
		return $(".js_group_users").prepend(t), $(".js_group_users").find("p.empty").fadeOut("fast"), this
	},
	
	afterRender: function() {
		var e = this.model.toJSON();
		"A" == e.state ? $(".js_radio_value").find("input.check_activo_" + e.uid).attr("checked", !0) : "I" == e.state ? $(".js_radio_value").find("input.check_inactivo_" + e.uid).attr("checked", !0) : "S" == e.state ? $(".js_radio_value").find("input.check_suspendido_" + e.uid).attr("checked", !0) : "E" == e.state && $(".js_radio_value").find("input.check_eliminado_" + e.uid).attr("checked", !0)
	},
	
	renderUpdate: function() {
		var e = this.model.toJSON();
		
		return this.$el.html(this.template(e)), this
	},
	
	asignationDirector: function(e) {
		e.preventDefault(), singleToggleContent($(".js_change_director_" + this.model.toJSON().uid))
	},
	
	cancelAsignationDirector: function(e) {
		e.preventDefault(), singleToggleContent($(".js_change_director_" + this.model.toJSON().uid))
	},
	
	aceptAsignationDirector: function(e) {
		var t = this;
		e.preventDefault(), $(".js_accept_change_director").addClass("active"), setTimeout(function() {
			t.model.set({
				actualizar_password: !1,
				is_director: !0,
				actualizar_dr: !0,
				actualizar_state: !1
			}, {
				wait: !0
			}), t.model.save(null, {
				success: function(e, t) {
					t.status ? ($(".sms_change_director").addClass("msg--success"), $(".sms_change_director").html("<p><span class='glyphicon glyphicon-ok'></span> " + t.sms + "</p>")) : ($(".sms_change_director").addClass("msg--danger"), $(".sms_change_director").html("<p><span class='glyphicon-exclamation-sign'></span> " + t.sms + "</p>"), setTimeout(function() {
						$(".sms_change_director").removeClass("msg--danger msg--success")
					}, 2300))
				},
				
				error: function() {
					$(".sms_change_director").addClass("msg--danger"), $(".sms_change_director").html("<p><span class='glyphicon-exclamation-sign'></span> " + response.sms + "</p>"), setTimeout(function() {
						$(".sms_change_director").removeClass("msg--danger msg--success")
					}, 2300)
				}
			}), $(".js_accept_change_director").removeClass("active")
		}, 1500)
	},
	
	changePassword: function(e) {
		e.preventDefault(), singleToggleContent($(".js_view_change_password_" + this.model.toJSON().uid))
	},
	
	confirmPassword: function(e) {
		e.preventDefault();
		
		var t = this,
			n = this.model.toJSON().uid,
			i = $(".one_password_" + n).val(),
			r = $(".two_password_" + n).val();
		
		return i && r ? i !== r ? ($(".alert_sms_text_" + n).html("<br /><p class='text-center text-danger'><strong>Las contraseñas no coinciden</strong></p>"), setTimeout(function() {
			$(".one_password_" + n).val(""), $(".two_password_" + n).val(""), $(".one_password_" + n).focus(), $(".alert_sms_text_" + n).empty()
		}, 1750), !1) : (t.model.set({
			actualizar_state: !1,
			actualizar_password: !0,
			actualizar_dr: !1,
			password: i
		}, {
			wait: !0
		}), void t.model.save(null, {
			success: function(e, t) {
				t.status ? $(".alert_sms_text_" + n).html("<br /><p class='text-center text-success'><span class='glyphicon glyphicon-ok'></span><b> " + t.sms + "</b></p>") : $(".alert_sms_text_" + n).html("<br /><p class='text-center text-danger'><span class='glyphicon-exclamation-sign'></span><b> " + t.sms + "</b></p>")
			},
			
			error: function() {
				$(".alert_sms_text_" + n).html("<p class='text-center text-danger'><span class='glyphicon-exclamation-sign'></span><b> " + response.sms + "</b></p>")
			}
		})) : ($(".alert_sms_text_" + n).html("<br /><p class='text-center text-danger'><strong>Los dos campos son necesarios.</strong></p>"), !1)
	},
	
	changeState: function(e) {
		e.preventDefault();
		
		var t = this.model.toJSON().uid;
		return e.target.value != this.model.toJSON().state && (toggleContent($(".js_view_radio_state_" + t), $(".js_view_autorization_state_" + t)), this.model.value_option = e.target.value, this.model.id_option = e.target.id), this
	},
	
	cancelChangestate: function(e) {
		e.preventDefault();
		
		var t = this.model.toJSON().uid;
		toggleContent($(".js_view_autorization_state_" + t), $(".js_view_radio_state_" + t))
	},
	
	aceptChangestate: function(e) {
		e.preventDefault();
		
		var t = this.model.toJSON().uid,
			n = $(".js_resolution_user_" + t).val();
		
		return n ? (this.model.set({
			actualizar_password: !1,
			actualizar_dr: !1,
			actualizar_state: !0,
			state: this.model.value_option,
			doc_auth: n
		}, {
			wait: !0
		}), void this.model.save(null, {
			success: function(e, n) {
				n.status ? $(".js_sms_txt_state_" + t).html("<br /><p class='text-center text-success'><span class='glyphicon glyphicon-ok'></span><b> " + n.sms + "</b></p>") : $(".js_sms_txt_state_" + t).html("<br /><p class='text-center text-danger'><span class='glyphicon-exclamation-sign'></span><b> " + n.sms + "</b></p>")
			},
			
			error: function() {
				$(".js_sms_txt_state_" + t).html("<p class='text-center text-danger'><span class='glyphicon-exclamation-sign'></span><b> " + response.sms + "</b></p>")
			}
		})) : ($(".js_sms_txt_state_" + t).html("<p class='text-center text-danger'><b>Se necesita una Resolución</b></p>"), !1)
	}
}), eUndac.Views.Interaction_PeriodRegularize = Backbone.View.extend({
	tagName: "header",
	className: "content__header  content__header--interaction",
	events: {
		"change .js_select": "changeSelect",
		"keyup .js_search": "keyaction"
	},
	
	initialize: function(e) {
		this.template = swig.compile($("#template_header_regularize").html()), this.template_perid = swig.compile($("#template_header_period").html()), this.render().afterRender()
	},
	
	render: function() {
		var e = this,
			t = e.model.toJSON(),
			n = e.$el.html(e.template(t));
		return $(".js_content_main").prepend(n), e
	},
	
	afterRender: function() {
		var e = this.model.toJSON().current;
		$(".js_select").val(e), smartInput($("#js-input_smart")), this.loadData(e)
	},
	
	changeSelect: function(e) {
		var t = $(e.target);
		this.loadData(t.val())
	},
	
	loadData: function(e) {
		var t = this,
			n = new eUndac.Collections.List_Period({
				id: e
			});
		
		n.fetch({
			success: function(e, n) {
				var i = e.toJSON(),
					r = {
						periods: i
					},
					s = t.template_perid(r);
				$(".js_select_perid").html(s)
			}
		})
	},
	
	search: function(e) {
		function t() {
			i.fetch({
				success: function(e, t) {
					n.children(".js-spinner").addClass("fadeOut"), setTimeout(function() {
						n.children(".js-spinner").removeClass("fadeUp fadeOut"), n.children(".js-group_interactive").addClass("active")
					}, 300)
				},
				
				error: function() {
					n.children(".js-spinner").addClass("fadeOut"), setTimeout(function() {
						n.children(".js-spinner").removeClass("fadeUp fadeOut"), n.children(".js-group_interactive").addClass("active")
					}, 300)
				}
			})
		}
		var n = $(".js_content_body"),
			i = new eUndac.Collections.Admin_Regularize({
				id: e
			});
		
		n.children(".js-group_interactive").hasClass("active") || n.children(".js-spinner").addClass("fadeUp"), n.children(".js-group_interactive").addClass("inactive"), setTimeout(function() {
			n.children(".js-spinner").addClass("fadeUp"), n.children(".js-group_interactive").removeClass("active inactive"), n.children(".js-group_interactive").find(".js-item").remove(), n.children(".js-group_interactive").find(".js-empty_group").slideDown("fast"), t()
		}, 300)
	},
	
	keyaction: function(e) {
		$(e.currentTarget);
		if (13 == e.keyCode) {
			var t = $(".js_escid").val(),
				n = $(".js_perid").val(),
				i = $(".js_subid").val();
			
			if (!t) return !1;
			var r = n + t + ";;" + i;
			this.search(r)
		}
	},
	
	chargedata: function() {
		$(".js-input_select_category").val(), $("js_perid").val()
	}
}), eUndac.Views.Admin_Teachers = Backbone.View.extend({
	tagName: "article",
	className: "item-teacher   js-item",
	events: {
		"click  input:radio": "changeState"
	},
	
	initialize: function() {
		this.template = swig.compile($("#template_teacher").html()), this.render()
	},
	
	render: function() {
		var e = this.model.toJSON(),
			t = this.$el.html(this.template(e));
		$(".js_group_active").append(t), $(".js_group_active").find("p.empty").fadeOut("fast");
		var n = this.model.toJSON().idget,
			i = this.model.toJSON().pid,
			r = new eUndac.Collections.CoursesRegularize({
				id: n
			});
		
		return chargeContent($(".js_content_body_courses" + i), r), this.collection_teachers = r, this
	},
	
	renderUpdate: function() {
		var e = this.model.toJSON();
		
		return this.$el.html(this.template(e)), this
	},
	
	changeState: function(e) {
		var t = (this.model.toJSON().uid, this.model.toJSON().pid),
			n = $(e.target),
			i = n.attr("whyCallMe");
		if ("IA" == i && e.target.value != this.model.toJSON().stateReport) {
			$(".js_load_report" + t).addClass("active");
			var r = e.target.value;
			this.model.set({
				stateReport: r,
				whyCallMe: i
			}), this.model.save(null, {
				success: function(e, n) {
					setTimeout(function() {
						$(".js_load_report" + t).removeClass("active inactive")
					}, 500)
				},
				
				error: function() {
					console.log("error")
				}
			})
		}
	}
}), eUndac.Views.CourseRegularize_View = Backbone.View.extend({
	tagName: "article",
	className: "item-course-teacher js-item",
	events: {
		"click .js_course": "viewDetail",
		"click  input:radio": "changeState",
		"click  a": "viewDocuments"
	},
	
	initialize: function() {
		var e = this;
		this.model.bind("change", function() {
			this.model.changed.success && setTimeout(function() {
				e.model.changed.hard_render ? (e.render().afterRender(), e.model.set({
					hard_render: !1,
					success: !1
				})) : e.renderUpdate(), e.model.set({
					success: !1
				})
			}, 1e3)
		}, this), this.template = swig.compile($("#template_course").html()), this.render()
	},
	
	render: function() {
		var e = this.model.toJSON(),
			t = this.$el.html(this.template(e)),
			n = this.model.toJSON().pid;
		return $(".js_group_courses" + n).prepend(t), $(".js_group_courses" + n).find("p.empty").fadeOut("fast"), this
	},
	
	renderUpdate: function() {
		var e = this.model.toJSON(),
			t = this.model.toJSON().courseid,
			n = this.model.toJSON().turno;
		return this.$el.html(this.template(e)), $(".js_course_" + t + n).addClass("active"), this
	},
	
	viewDetail: function(e) {
		var t = this.model.toJSON().courseid,
			n = this.model.toJSON().turno;
		1 == $(".js_course_" + t + n).hasClass("active") ? ($(".js_course_" + t + n).addClass("inactive"), setTimeout(function() {
			$(".js_course_" + t + n).removeClass("active inactive")
		}, 300)) : $(".js_course_" + t + n).addClass("active")
	},
	
	viewDocuments: function(e) {
		e.preventDefault();
		
		var t = $(e.target);
		1 == t.hasClass("active") ? (t.addClass("inactive"), setTimeout(function() {
			t.removeClass("active inactive")
		}, 300)) : t.addClass("active")
	},
	
	changeState: function(e) {
		e.preventDefault();
		
		var t = this.model.toJSON().courseid,
			n = this.model.toJSON().turno,
			i = $(e.target),
			r = i.attr("whyCallMe");
		if ("S" == r) {
			var s = (i.attr("order"), this.model.toJSON().stateSyllabus),
				o = e.target.value;
			if (s != o) {
				$(".js_load_syllabus" + t + n).addClass("active");
				var o = e.target.value;
				this.model.toJSON().idget;
				this.model.set({
					stateSyllabus: o,
					whyCallMe: r
				}), this.model.save(null, {
					success: function(e, i) {
						setTimeout(function() {
							$(".js_load_syllabus" + t + n).removeClass("active inactive")
						}, 500)
					},
					
					error: function() {
						console.log("error")
					}
				})
			}
		} else {
			var a = i.attr("partial");
			if ("AS" == r) {
				var c = this.model.toJSON().AsistancePP,
					l = this.model.toJSON().AsistanceSP;
				if ("1" == a) {
					$(".js_load_assistance_first" + t + n).addClass("active");
					var o = "A" == e.target.value ? "A" : "P",
						l = "P";
					this.model.set({
						AsistancePP: o,
						whyCallMe: r,
						AsistanceSP: l,
						partial: a
					}), this.model.save(null, {
						success: function(e, i) {
							setTimeout(function() {
								$(".js_load_assistance_first" + t + n).removeClass("active inactive")
							}, 500)
						},
						
						error: function() {
							console.log("error")
						}
					})
				} else {
					$(".js_load_assistance_second" + t + n).addClass("active");
					var o = "P" == e.target.value ? "P" : "C";
					c = "C" == o ? "C" : "P", this.model.set({
						AsistancePP: c,
						whyCallMe: r,
						AsistanceSP: o,
						partial: a
					}), this.model.save(null, {
						success: function(e, i) {
							setTimeout(function() {
								$(".js_load_assistance_second" + t + n).removeClass("active inactive")
							}, 500)
						},
						
						error: function() {
							console.log("error")
						}
					})
				}
			} else {
				var c = this.model.toJSON().statePrimerParcial,
					l = this.model.toJSON().stateSecondParcial;
				if ("1" == a) if ($(".js_load_record_first" + t + n).addClass("active"), "A" == e.target.value) var u = "A",
					d = "A";
				else
				var u = "A",
					d = "P";
				else if ($(".js_load_record_second" + t + n).addClass("active"), "P" == e.target.value) var u = "A",
					d = "P";
				else
				var u = "C",
					d = "C";
				this.model.set({
					statePrimerParcial: u,
					stateSecondParcial: d,
					whyCallMe: r
				}), this.model.save(null, {
					success: function(e, i) {
						"1" == a ? setTimeout(function() {
							$(".js_load_record_first" + t + n).removeClass("active inactive")
						}, 500) : setTimeout(function() {
							$(".js_load_record_second" + t + n).removeClass("active inactive")
						}, 500)
					},
					
					error: function() {}
				})
			}
		}
	}
}), eUndac.Views.Admin_Roles = Backbone.View.extend({
	tagName: "article",
	className: "item-table   js-item",
	events: {
		"click .js_button-more-detail": "moreDetail",
		"click .js_button-back": "backToNoDetail",
		"click .js_button-edit": "editRol",
		"click .js_button-back_detail": "backToDetail",
		"submit .js_form-edit": "submitEditForm",
		"click .js_button-delete": "toggleDeleteCape",
		"click .js_button-delete-cancel": "toggleDeleteCape",
		"click .js_button-delete-confirm": "confirmDelete"
	},
	
	initialize: function() {
		var e = this;
		this.model.bind("change", function() {
			this.model.changed.success && setTimeout(function() {
				e.model.changed.hard_render ? (e.render().afterRender(), e.model.set({
					hard_render: !1
				})) : e.renderUpdate().afterRender(), e.model.set({
					success: !1
				})
			}, 2e3)
		}, this), this.template = swig.compile($("#template_rol").html()), template_rol_detail = swig.compile($("#template_rol-detail").html()), template_rol_edit = swig.compile($("#template_rol-edit").html()), this.template_msg_error = swig.compile($("#template_msg_error").html()), this.template_msg_success = swig.compile($("#template_msg_success").html()), this.template_msg_danger = swig.compile($("#template_msg_danger_update").html()), this.render().afterRender()
	},
	
	render: function() {
		var e = this.model.toJSON(),
			t = this.$el.html(this.template(e));
		return "A" === e.state ? ($(".js_group_active").prepend(t), $(".js_group_active").find("p.empty").fadeOut("fast")) : "I" === e.state && ($(".js_group_close").prepend(t), $(".js_group_close").find("p.empty").fadeOut("fast")), this
	},
	
	renderUpdate: function() {
		var e = this.model.toJSON();
		
		return this.$el.html(this.template(e)), this
	},
	
	moreDetail: function(e) {
		e.preventDefault(), toggleContent(this.$content_no_detail, this.$content_detail)
	},
	
	backToNoDetail: function(e) {
		e.preventDefault(), toggleContent(this.$content_detail, this.$content_no_detail)
	},
	
	afterRender: function() {
		var e = this.model.toJSON(),
			t = template_rol_detail(e);
		this.$el.find(".js_interactive_sections").append(t);
		var n = template_rol_edit(e);
		this.$el.find(".js_interactive_sections").append(n), this.$content_no_detail = this.$el.find(".js_section-no-detail"), this.$content_detail = this.$el.find(".js_section-detail"), this.$content_edit = this.$el.find(".js_section-edit"), this.$delete_cape = this.$el.find(".js_delete-cape"), this.$form = this.$el.find(".js_form-edit"), this.$messages_site = this.$el.find(".js_form_messages")
	},
	
	editRol: function(e) {
		e.preventDefault(), toggleContent(this.$content_detail, this.$content_edit)
	},
	
	backToDetail: function(e) {
		e.preventDefault(), toggleContent(this.$content_edit, this.$content_detail)
	},
	
	submitEditForm: function(e) {
		e.preventDefault();
		
		var t = this.$form.serializeJSON();
		
		this.model.set(t), update(this.$form, this), this.searchForEmpty()
	},
	
	searchForEmpty: function() {
		setTimeout(function() {
			0 === $(".js_group_active").find("article").length && $(".js_group_active").find("p.empty").fadeIn("fast"), 0 === $(".js_group_close").find("article").length && $(".js_group_close").find("p.empty").fadeIn("fast")
		}, 2200)
	},
	
	toggleDeleteCape: function(e) {
		e.preventDefault(), toggleDelete(this.$delete_cape)
	},
	
	confirmDelete: function(e) {
		e.preventDefault();
		
		var t = $(e.target);
		deleteItem(t, this), this.searchForEmpty()
	}
}), eUndac.Views.Rol_Form = Backbone.View.extend({
	events: {
		"click .js_button_cancel": "cancel",
		"submit form": "submitForm"
	},
	
	initialize: function(e) {
		this.template = e.template, template_msg_error = swig.compile($("#template_msg_error").html()), template_msg_success = swig.compile($("#template_msg_success").html()), template_msg_danger = swig.compile($("#template_msg_danger_new").html()), this.$content_new = $(".js_content_new"), this.$content_main = $(".js_content_main"), this.render().afterRender()
	},
	
	render: function() {
		var e = this.$el.html(this.template);
		return this.$content_new.html(e), this
	},
	
	afterRender: function() {
		this.$form = $(".js_form-rol-new")
	},
	
	cancel: function(e) {
		e.preventDefault(), changeContent(this.$content_new, this.$content_main)
	},
	
	submitForm: function(e) {
		e.preventDefault();
		
		var t = this,
			n = this.$form.serializeJSON(),
			i = new eUndac.Models.Rol(n),
			r = this.$form.find(".js_form_messages"),
			s = this.$form.find("input[type=submit]");
		console.log("data a guardar", i), s.val("Guardando...").attr("disabled", !0), i.save(null, {
			success: function(e, n) {
				n.success ? (console.log("guardado"), e.set({
					idget: n.idget,
					success: !1
				}), n.render && t.collection.add(e), r.html(template_msg_success()), s.val("Guardado"), setTimeout(function() {
					changeContent(t.$content_new, t.$content_main), cleanForm(t.$form), s.removeAttr("disabled").val("Guardar"), r.html("")
				}, 2e3)) : (r.html(template_msg_error(n)), s.removeAttr("disabled").val("Guardar"))
			},
			
			error: function() {
				s.removeAttr("disabled").val("Guardar"), r.html(template_msg_danger())
			}
		})
	}
}), eUndac.Views.View_Rates = Backbone.View.extend({
	tagName: "article",
	className: "item-table   js-item",
	events: {
		"click .js_button-more-detail": "moreDetail",
		"click .js_button-back": "backToNoDetail",
		"click .js_button-edit": "editRate",
		"click .js_button-back_detail": "backToDetail",
		"submit .js_form-edit": "submitEditForm",
		"click .js_button-delete": "toggleDeleteCape",
		"click .js_button-delete-cancel": "toggleDeleteCape",
		"click .js_button-delete-confirm": "confirmDelete"
	},
	
	initialize: function() {
		var e = this;
		this.model.bind("change", function() {
			this.model.changed.success && setTimeout(function() {
				e.model.changed.hard_render ? (e.render().afterRender(), e.model.set({
					hard_render: !1
				})) : e.renderUpdate().afterRender(), e.model.set({
					success: !1
				})
			}, 2e3)
		}, this), this.template = swig.compile($("#template_rate").html()), template_rate_detail = swig.compile($("#template_rate-detail").html()), template_rate_edit = swig.compile($("#template_rate-edit").html()), this.template_msg_error = swig.compile($("#template_msg_error").html()), this.template_msg_success = swig.compile($("#template_msg_success").html()), this.template_msg_danger = swig.compile($("#template_msg_danger_update").html()), this.render().afterRender()
	},
	
	render: function() {
		var e = this.model.toJSON(),
			t = this.$el.html(this.template(e));
		return $(".js_group_active").append(t), $(".js_group_active").find("p.empty").fadeOut("fast"), this
	},
	
	renderUpdate: function() {
		var e = this.model.toJSON();
		
		return this.$el.html(this.template(e)), this
	},
	
	moreDetail: function(e) {
		e.preventDefault(), toggleContent(this.$content_no_detail, this.$content_detail)
	},
	
	backToNoDetail: function(e) {
		e.preventDefault(), toggleContent(this.$content_detail, this.$content_no_detail)
	},
	
	afterRender: function() {
		var e = this.model.toJSON(),
			t = template_rate_detail(e);
		this.$el.find(".js_interactive_sections").append(t);
		var n = template_rate_edit(e);
		this.$el.find(".js_interactive_sections").append(n), $("input[js-type=date]").datepicker(), this.$content_no_detail = this.$el.find(".js_section-no-detail"), this.$content_detail = this.$el.find(".js_section-detail"), this.$content_edit = this.$el.find(".js_section-edit"), this.$delete_cape = this.$el.find(".js_delete-cape"), this.$form = this.$el.find(".js_form-edit"), this.$messages_site = this.$el.find(".js_form_messages")
	},
	
	editRate: function(e) {
		e.preventDefault(), toggleContent(this.$content_detail, this.$content_edit)
	},
	
	backToDetail: function(e) {
		e.preventDefault(), toggleContent(this.$content_edit, this.$content_detail)
	},
	
	submitEditForm: function(e) {
		e.preventDefault();
		
		var t = this.$form.serializeJSON();
		
		this.model.set(t), update(this.$form, this), this.searchForEmpty()
	},
	
	searchForEmpty: function() {
		setTimeout(function() {
			0 === $(".js_group_active").find("article").length && $(".js_group_active").find("p.empty").fadeIn("fast"), 0 === $(".js_group_temporary").find("article").length && $(".js_group_temporary").find("p.empty").fadeIn("fast"), 0 === $(".js_group_close").find("article").length && $(".js_group_close").find("p.empty").fadeIn("fast")
		}, 2200)
	},
	
	toggleDeleteCape: function(e) {
		e.preventDefault(), toggleDelete(this.$delete_cape)
	},
	
	confirmDelete: function(e) {
		e.preventDefault();
		
		var t = $(e.target);
		console.log(t), deleteItem(t, this), this.searchForEmpty()
	}
}), eUndac.Views.Rate_Form = Backbone.View.extend({
	events: {
		"click .js_button_cancel": "cancel",
		"submit form": "submitForm"
	},
	
	initialize: function(e) {
		this.template = e.template, this.template_msg_error = swig.compile($("#template_msg_error").html()), this.template_msg_success = swig.compile($("#template_msg_success").html()), this.template_msg_danger = swig.compile($("#template_msg_danger_new").html()), this.$content_new = $(".js_content_new"), this.$content_main = $(".js_content_main"), this.render().afterRender()
	},
	
	render: function() {
		var e = this.$el.html(this.template);
		return this.$content_new.html(e), this
	},
	
	afterRender: function() {
		this.$form = $(".js_form-rate-new")
	},
	
	cancel: function(e) {
		e.preventDefault(), changeContent(this.$content_new, this.$content_main)
	},
	
	submitForm: function(e) {
		e.preventDefault();
		
		var t = this.$form.serializeJSON(),
			n = $("#js-period").val();
		
		t.year = n;
		var i = new eUndac.Models.Rate(t);
		saveNew(this.$form, i, this.collection, this)
	}
}), eUndac.Views.Interaction_HeaderConvalidation = Backbone.View.extend({
	tagName: "header",
	className: "section-voh__header  section-voh__header--interactive",
	events: {
		"click .js_search": "button",
		keypress: "keyaction"
	},
	
	initialize: function(e) {
		this.template = e.template, this.template_convalidation = swig.compile(this.template.html()), this.template_resolution = swig.compile($("#template_resolution").html()), this.render()
	},
	
	render: function() {
		var e = this.template_convalidation();
		
		return $(".js_content_main").prepend(this.$el.html(e)), this
	},
	
	keyaction: function(e) {
		13 != e && 13 != e.which && 0 != e.which || this.button(e)
	},
	
	button: function(e) {
		e.preventDefault();
		
		var t = $(".js_content_body"),
			n = $(".js_student").val();
		
		if (n) {
			var i = n.length;
			10 == i ? this.search(n) : ($(".js_group_student").html(""), t.children(".js-group_interactive").find(".js-item").remove(), t.children(".js-group_interactive").find(".js-empty_group").html("<span class='glyphicon glyphicon-exclamation-sign'></span> Ingrese un Código CORRECTO..."), $(".js-group_interactive").hasClass("active") || $(".js-group_interactive").addClass("active"), $(".js-empty_group").slideDown("fast"), setTimeout(function() {
				$(".js-group_interactive").removeClass("active")
			}, 2300), $(".js_student").focus())
		} else $(".js_group_student").html(""), t.children(".js-group_interactive").find(".js-item").remove(), t.children(".js-group_interactive").find(".js-empty_group").html("<span class='glyphicon glyphicon-exclamation-sign'></span> Ingrese un Código..."), $(".js-group_interactive").hasClass("active") || $(".js-group_interactive").addClass("active"), $(".js-empty_group").slideDown("fast"), setTimeout(function() {
			$(".js-group_interactive").removeClass("active")
		}, 2300), $(".js_student").focus()
	},
	
	search: function(e) {
		var t = $(".js_content_body");
		$.ajax({
			url: "/restglobal/personmin/" + e,
			type: "GET",
			success: function(e) {
				if (0 != e) {
					var n = ($(".js_facidSesion").val(), $(".js_subidSesion").val());
					n == e.subid || "1904" == e.subid || "1907" == e.subid ? (t.children(".js-spinner").addClass("fadeUp"), $(".js_group_student").html(""), setTimeout(function() {
						t.children(".js-spinner").addClass("fadeOut");
						new eUndac.Views.Student({
							model: e
						});
						
						t.children(".js-spinner").removeClass("fadeUp fadeOut")
					}, 2e3)) : ($(".js_group_student").html(""), t.children(".js-group_interactive").find(".js-item").remove(), t.children(".js-group_interactive").find(".js-empty_group").html("<span class='glyphicon glyphicon-exclamation-sign'></span> Alumno(a) no pertenece a la facultad..."), $(".js-group_interactive").hasClass("active") || $(".js-group_interactive").addClass("active"), $(".js-empty_group").slideDown("fast"), setTimeout(function() {
						$(".js-group_interactive").removeClass("active")
					}, 2300), $(".js_student").focus())
				} else $(".js_group_student").html(""), t.children(".js-group_interactive").find(".js-item").remove(), t.children(".js-group_interactive").find(".js-empty_group").html("<span class='glyphicon glyphicon-exclamation-sign'></span> No se encontro alumno(a)..."), $(".js-group_interactive").hasClass("active") || $(".js-group_interactive").addClass("active"), $(".js-empty_group").slideDown("fast"), setTimeout(function() {
					$(".js-group_interactive").removeClass("active")
				}, 2300), $(".js_student").focus()
			},
			
			error: function() {
				console.log("error")
			}
		})
	}
}), eUndac.Views.List_CoursesConvalidation = Backbone.View.extend({
	tagName: "article",
	className: "item-course-single js-item",
	events: {
		"click .js_search": "search"
	},
	
	initialize: function() {
		this.template_course = swig.compile($("#template_course").html()), this.render()
	},
	
	render: function() {
		var e = this.model.toJSON(),
			t = this.model.toJSON().nres,
			n = this.model.toJSON().semid,
			i = this.$el.html(this.template_course(e));
		this.afterRender(t, n, i)
	},
	
	afterRender: function(e, t, n) {
		$(".js-spinner_res_" + e).hasClass("show") && $(".js-spinner_res_" + e).removeClass("show"), $(".js_view_" + e + "_" + t).removeClass("hide"), $(".js_" + e + "_" + t).append(n)
	}
}), eUndac.Views.Student = Backbone.View.extend({
	tagName: "section",
	className: "section-convalidaton js-item",
	events: {
		"click .js_add_convalidation": "newconvalidation",
		"click .js_cancel": "moreNew",
		"keyup .js-input_filter": "keyaction",
		"click .js_guardar": "guardar",
		"click .js_edit": "edit",
		"click .js_button-back": "backedit",
		"change .js_note_edit": "modifynotes",
		"click .js_save_edit": "saveEdit",
		"click .js_button-delete-cancel": "toggleDeleteCape",
		"click .js_delete": "confirmDelete",
		"click .js_msg_confirm": "confirmSave"
	},
	
	initialize: function(e) {
		this.template_student = swig.compile($("#template_student").html()), this.template_resolution = swig.compile($("#template_resolution").html()), this.template_msg_error = swig.compile($("#template_msg_error").html()), this.template_msg_success = swig.compile($("#template_msg_success").html()), this.render(e)
	},
	
	render: function(e) {
		this.id = e.model.idget;
		var t = this.$el.html(this.template_student(e));
		$(".js_group_student").html(t), this.$content_list = this.$el.find(".js_convalidation_list"), this.$content_new = this.$el.find(".js_convalidation_new");
		var n = this;
		$.ajax({
			url: "/rest/listresolution/" + n.id,
			type: "GET",
			success: function(e) {
				var t = $(".js_courses_convalidation");
				if (0 == e) t.children(".js-spinner").addClass("fadeUp"), setTimeout(function() {
					t.children(".js-spinner").removeClass("fadeUp fadeOut"), t.children(".js-group_interactive").addClass("active")
				}, 300), n.convalidation(n.id);
				else {
					$(".js_print").removeClass("hide");
					var i = {
						data: e
					},
						r = n.template_resolution(i);
					n.$el.find(".js_courses_convalidation").html(r), n.courses(n.id), n.convalidation(n.id)
				}
			},
			
			error: function() {
				console.log("error")
			}
		})
	},
	
	courses: function(e) {
		var t = new eUndac.Collections.CoursesConvalidation({
			id: e
		});
		
		t.fetch(), this.collection_convalidados = t
	},
	
	convalidation: function(e) {
		var t = new eUndac.Collections.Convalidations({
			id: e
		});
		
		t.fetch()
	},
	
	newconvalidation: function(e) {
		e.preventDefault(), toggleContent(this.$content_list, this.$content_new)
	},
	
	moreNew: function(e) {
		e.preventDefault(), toggleContent(this.$content_new, this.$content_list)
	},
	
	keyaction: function(e) {
		var t = $(e.currentTarget),
			n = t.val(),
			i = n.toUpperCase();
		
		$(this).siblings(".js_list_courses").children("article").each(function() {
			currentText = $(this).text().toUpperCase(), showCurrentLi = currentText.indexOf(i) !== -1, console.log(showCurrentLi), $(this).toggle(showCurrentLi)
		})
	},
	
	guardar: function(e) {
		var t = this;
		if (e.preventDefault(), null == coursesCollection) console.log("no agregaste cursos");
		else {
			var n = ($(".js_courses_convalidation"), $("#js_resolution").val());
			if (n) {
				var i = 0,
					r = 0;
				coursesCollection.each(function(e, t) {
					e.toJSON().note > 10 && e.toJSON().note < 21 && r++, "S" == e.toJSON().add && i++
				}), 0 != i & i == r ? ($(".js_guardar").addClass("hide"), $(".js_msg_confirm").addClass("active")) : ($(".js_form_messages").html('<div class="msg  msg--warning  msg--appear"><p><span class="glyphicon glyphicon-exclamation-sign"></span> Ingrese notas aprobatorias</p></div>'), setTimeout(function() {
					$(".js_form_messages").html("")
				}, 2e3))
			} else setTimeout(function() {
				$(".js_form_messages").html(t.template_msg_error())
			}, 100), $(".js_form_messages").html("")
		}
	},
	
	confirmSave: function(e) {
		e.preventDefault();
		
		var t = this,
			n = $("#js_resolution").val(),
			i = $(".js_escid_student").val(),
			r = $(".js_subid_student").val(),
			s = $(".js_uid_student").val(),
			o = $(".js_pid_student").val(),
			a = $(".js_courses_convalidation");
		$(".js_form_messages").html(t.template_msg_success), coursesCollection.each(function(e, t) {
			if (e.toJSON().note > 10 && e.toJSON().note < 21) {
				e.set({
					escid: i,
					subid: r,
					resolution: n,
					uid: s,
					pid: o
				}), e.save();
				
				var a = e.toJSON().courseid;
				e.clear([a]);
				var c = $(".js_" + a).parent();
				
				c.removeClass("add"), c.addClass("hide")
			}
		}), setTimeout(function() {
			$(".js_form_messages").html(""), $(".js_print").removeClass("hide"), $(".js_guardar").addClass("hide")
		}, 500), $.ajax({
			url: "/rest/listresolution/" + t.id,
			type: "GET",
			success: function(e) {
				if (0 == e) a.children(".js-spinner").addClass("fadeUp"), setTimeout(function() {
					a.children(".js-spinner").removeClass("fadeUp fadeOut"), a.children(".js-group_interactive").addClass("active")
				}, 300);
				else {
					var n = {
						data: e
					},
						i = t.template_resolution(n);
					$(".js_courses_convalidation").html(""), $(".js_coursesConvalidation").html(""), $("#js_resolution").val(""), $(".js_courses_convalidation").append(i), t.courses(t.id)
				}
			},
			
			error: function() {
				console.log("error")
			}
		}), setTimeout(function() {
			$(".js_msg_confirm").removeClass("active"), $(".js_info_courses").removeClass("hide"), $(".js_info_notes").addClass("hide"), toggleContent(t.$content_new, t.$content_list)
		}, 2e3)
	},
	
	edit: function(e) {
		e.preventDefault();
		
		var t = $(e.target),
			n = t.attr("res");
		$(".js_view_detail_" + n).addClass("hide"), $(".js_edit_" + n).removeClass("hide")
	},
	
	backedit: function(e) {
		e.preventDefault();
		
		var t = $(e.target),
			n = t.attr("res");
		$(".js_view_detail_" + n).removeClass("hide"), $(".js_edit_" + n).addClass("hide")
	},
	
	modifynotes: function(e) {
		var t = $(e.target),
			n = t.attr("courseid"),
			i = $(".js_uid_student").val(),
			r = $(".js_pid_student").val(),
			s = $(".js_escid_student").val(),
			o = $(".js_subid_student").val(),
			a = $(".js_perid_s").val(),
			c = $("#edit_" + n).val(),
			l = "y";
		this.collection_convalidados.each(function(e, t) {
			e.toJSON().code == n && e.set({
				notafinal: c,
				modify: l,
				uid: i,
				pid: r,
				escid: s,
				subid: o,
				perid: a
			})
		})
	},
	
	saveEdit: function(e) {
		var t = this;
		e.preventDefault();
		
		var n = $(e.target),
			i = n.attr("res"),
			r = 0;
		if (this.collection_convalidados.each(function(e, t) {
			e.toJSON().notafinal < 11 && "y" == e.toJSON().modify && r++
		}), 0 == r) {
			var s = $(".js_courses_convalidation"),
				o = 0;
			this.collection_convalidados.each(function(e, t) {
				"y" == e.toJSON().modify && (e.save(), o++)
			}), $(".js_form_messages_edit").html(t.template_msg_success), 0 != o && $.ajax({
				url: "/rest/listresolution/" + t.id,
				type: "GET",
				success: function(e) {
					if (0 == e) s.children(".js-spinner").addClass("fadeUp"), setTimeout(function() {
						s.children(".js-spinner").removeClass("fadeUp fadeOut"), s.children(".js-group_interactive").addClass("active")
					}, 300);
					else {
						var n = {
							data: e
						},
							i = t.template_resolution(n);
						$(".js_courses_convalidation").html(""), $(".js_coursesConvalidation").html(""), $("#js_resolution").val(""), $(".js_courses_convalidation").append(i), t.courses(t.id)
					}
				},
				
				error: function() {
					console.log("error")
				}
			}), setTimeout(function() {
				$(".js_view_detail_" + i).removeClass("hide"), $(".js_edit_" + i).addClass("hide")
			}, 4e3)
		} else $(".js_form_messages_edit").html('<div class="msg  msg--warning  msg--appear"><p><span class="glyphicon glyphicon-exclamation-sign"></span> Ingrese notas aprobatorias</p></div>'), setTimeout(function() {
			$(".js_form_messages_edit").html("")
		}, 2e3)
	},
	
	toggleDeleteCape: function(e) {
		e.preventDefault(), toggleDelete(this.$delete_cape)
	},
	
	confirmDelete: function(e) {
		e.preventDefault();
		
		var t = $(e.target);
		deleteItem(t, this)
	}
}), eUndac.Views.Convalidation = Backbone.View.extend({
	tagName: "article",
	className: "item-course-add js-item",
	events: {
		"click .js_plus": "addCourse",
		"click .js_minus_c": "deletecoursec"
	},
	
	initialize: function() {
		this.template_courses = swig.compile($("#template_courses_convalidation").html()), this.render()
	},
	
	render: function() {
		$(".js-spinner_list").hasClass("show") && $(".js-spinner_list").removeClass("show");
		var e = this.model.toJSON(),
			t = this.$el.html(this.template_courses(e));
		$(".js_list_courses").append(t)
	},
	
	renderUpdate: function() {
		var e = this.model.toJSON();
		
		return this.$el.html(this.template_courses(e)), this
	},
	
	addCourse: function(e) {
		e.preventDefault();
		
		var t = "S";
		this.model.set({
			add: t
		});
		
		this.model.toJSON();
		
		coursesCollection = this.model.collection;
		var n = (new eUndac.Views.Course_Note({
			model: this.model
		}), this.model.toJSON().courseid),
			i = $(".js_" + n).parent();
		
		i.addClass("add"), $(".js_guardar").hasClass("hide") && ($(".js_guardar").removeClass("hide"), $(".js_info_courses").addClass("hide"), $(".js_info_notes").removeClass("hide")), $(".js_msg_confirm").hasClass("active") && $(".js_msg_confirm").removeClass("active")
	},
	
	deletecoursec: function(e) {
		e.preventDefault();
		
		var t = this.model.toJSON().courseid,
			n = $(".js_" + t).parent();
		
		n.removeClass("add");
		var i = $("#" + t),
			r = i.parent().parent();
		
		r.addClass("hide"), r.html("");
		var s = "",
			o = "N",
			a = "N";
		this.model.unset({
			note: s,
			opc: o,
			add: a
		});
		
		var c = 0;
		coursesCollection.each(function(e, t) {
			"S" == e.toJSON().add && c++
		}), 0 == c ? ($(".js_guardar").addClass("hide"), $(".js_info_courses").removeClass("hide"), $(".js_info_notes").addClass("hide")) : $(".js_guardar").hasClass("hide") && $(".js_guardar").removeClass("hide"), $(".js_msg_confirm").hasClass("active") && $(".js_msg_confirm").removeClass("active")
	}
}), eUndac.Views.Course_Note = Backbone.View.extend({
	tagName: "article",
	className: "item-course-qualified js-item",
	events: {
		"click .js_minus": "deleteCourse",
		"change .js_note_course": "notes"
	},
	
	initialize: function(e) {
		this.template_coursec = swig.compile($("#coursesConvalidation").html()), this.render(e)
	},
	
	render: function(e) {
		var t = 0;
		this.model.set({
			note: t
		});
		
		var n = this.model.toJSON(),
			i = (this.model.toJSON().courseid, this.$el.html(this.template_coursec(n)));
		return $(".js_coursesConvalidation").append(i), this
	},
	
	deleteCourse: function(e) {
		e.preventDefault();
		
		var t = $(e.currentTarget),
			n = this.model.toJSON().courseid,
			i = $(".js_" + n).parent();
		
		i.removeClass("add");
		var r = t.parent().parent();
		
		r.addClass("hide"), r.html("");
		var s = "",
			o = "N",
			a = "N";
		this.model.unset({
			note: s,
			opc: o,
			add: a
		});
		
		var c = 0;
		coursesCollection.each(function(e, t) {
			"S" == e.toJSON().add && c++
		}), 0 == c ? ($(".js_guardar").addClass("hide"), $(".js_info_courses").removeClass("hide"), $(".js_info_notes").addClass("hide")) : $(".js_guardar").hasClass("hide") && $(".js_guardar").removeClass("hide"), $(".js_msg_confirm").hasClass("active") && $(".js_msg_confirm").removeClass("active")
	},
	
	notes: function() {
		var e = this.model.toJSON().courseid,
			t = $("#" + e).val(),
			n = "S";
		this.model.set({
			note: t,
			opc: n
		}), $(".js_msg_confirm").hasClass("active") && $(".js_msg_confirm").removeClass("active")
	}
}), eUndac.Views.Interaction_Header = Backbone.View.extend({
	tagName: "header",
	className: "content__header  content__header--interaction",
	events: {
		"change .js_select": "changeSelect",
		"click .js_button_new": "new",
		"click .js_button_new_fast": "newFast"
	},
	
	initialize: function(e) {
		this.model_collection = null, e.model_collection && (this.model_collection = e.model_collection), this.template = swig.compile($("#template_header_period").html()), this.render().afterRender()
	},
	
	render: function() {
		var e = this.template(this.model.toJSON());
		return $(".js_content_main").prepend(this.$el.html(e)), this
	},
	
	afterRender: function() {
		var e = this.model.toJSON().current;
		$(".js_select").val(e), this.loadData(e)
	},
	
	changeSelect: function(e) {
		var t = $(e.target);
		this.loadData(t.val())
	},
	
	loadData: function(e) {
		this.collection.id = e, $(".js_form-period-new").find("input[name=year]").val(e), chargeContent($(".js_content_body"), this.collection)
	},
	
	"new": function() {
		changeContent($(".js_content_main"), $("#js_content_new"))
	},
	
	newFast: function() {
		var e = this.collection.pluck("period_letter");
		console.log(e);
		var t = "A";
		if (e.length > 0 && (t = "B", e.forEach(function(e) {
			"B" === e && (t = "N")
		}), "N" === t && e.forEach(function(e) {
			"N" === e && (t = null)
		})), t) {
			var n = $("#js-select_year").val().substring(2, 4),
				i = {
					period: n + t
				};
			
			console.log(i), this.model_collection.save(i, {
				success: function(e, t) {
					console.log(e, t)
				},
				
				error: function() {
					console.log("Error")
				}
			})
		}
	}
}), eUndac.Views.Faculty_Header = Backbone.View.extend({
	tagName: "header",
	className: "content__header  content__header--interaction",
	events: {
		"click .js_button_new": "new"
	},
	
	initialize: function() {
		this.template = swig.compile($("#template_header_faculty").html()), this.render()
	},
	
	render: function() {
		var e = this.template();
		
		return $(".js_content_main").prepend(this.$el.html(e)), this
	},
	
	"new": function(e) {
		e.preventDefault(), changeContent($(".js_content_main"), $(".js_content_new"))
	}
}), eUndac.Views.Organization_Header = Backbone.View.extend({
	tagName: "header",
	className: "content__header  content__header--interaction",
	events: {
		"click .js_button_new": "new"
	},
	
	initialize: function() {
		this.template = swig.compile($("#template_header_organization").html()), this.render()
	},
	
	render: function() {
		var e = this.template();
		
		return $(".js_content_main").prepend(this.$el.html(e)), this
	},
	
	"new": function(e) {
		e.preventDefault(), changeContent($(".js_content_main"), $(".js_content_new"))
	}
}), eUndac.Views.Subsidiarys_Header = Backbone.View.extend({
	tagName: "header",
	className: "content__header  content__header--interaction",
	events: {
		"click .js_button_new": "new"
	},
	
	initialize: function() {
		this.template = swig.compile($("#template_header_subsidiary").html()), this.render()
	},
	
	render: function() {
		var e = this.template();
		
		return $(".js_content_main").prepend(this.$el.html(e)), this
	},
	
	"new": function(e) {
		e.preventDefault(), changeContent($(".js_content_main"), $(".js_content_new"))
	}
}), eUndac.Views.TypeError = Backbone.View.extend({
	initialize: function(e) {
		template_error_payment = swig.compile($("#template_error-payment").html()), this.loadError(), this.options = e
	},
	
	render: function() {
		var e;
		e = this.model ? template_error_payment(this.model.toJSON()) : this.options ? template_error_payment({
			type: this.options.type
		}) : template_error_payment(), $("#js_main-data").html(e)
	},
	
	loadError: function() {
		var e = this;
		$("#js_main_spinner").addClass("fadeOut"), setTimeout(function() {
			$("#js_main_spinner").removeClass("fadeUp fadeOut"), e.render()
		}, 300)
	}
}), eUndac.Views.Interaction_School = Backbone.View.extend({
	tagName: "header",
	className: "content__header  content__header--interaction",
	events: {
		"change .js_selectfacid": "changeSelect",
		"click  .js_button_new": "new"
	},
	
	initialize: function(e) {
		this.template = e.template, this.template_school = swig.compile($("#template_header_school").html()), this.render()
	},
	
	render: function() {
		var e = this;
		return $.ajax({
			url: "/restglobal/facultymin",
			type: "GET",
			success: function(t) {
				e.afterRender(t[0].idget), e.loadFacultys(t);
				var n = {
					facultys: t
				},
					i = e.template_school(n);
				$(".js_content_main").prepend(e.$el.html(i))
			},
			
			error: function() {
				console.log("Ocurrió un error al cargar las facultades")
			}
		}), $.ajax({
			url: "/restglobal/subsidiarymin",
			type: "GET",
			success: function(t) {
				for (var n = 0; n < t.length; n++)"A" == t[n].state && "1000" != t[n].subid && "0000" != t[n].subid && $("#subid").append("<option value=" + t[n].idget + ">" + t[n].name + "</option>");
				e.loadSubsidiarys(t)
			},
			
			error: function() {
				console.log("Ocurrió un error al cargar las sedes")
			}
		}), e
	},
	
	afterRender: function(e) {
		this.loadData(e)
	},
	
	changeSelect: function(e) {
		var t = $(e.target);
		this.loadData(t.val())
	},
	
	"new": function(e) {
		e.preventDefault(), $("#facid").empty();
		
		for (var t = this.collection.facid, n = $(".js_selectfacid").val(), i = 0; i < t.length; i++) n == t[i].idget && $("#facid").append("<option value=" + t[i].idget + ' selected="selected">' + t[i].name + "</option>");
		changeContent($(".js_content_main"), $(".js_content_new"))
	},
	
	loadData: function(e) {
		this.collection.id = e, chargeContent($(".js_content_body"), this.collection)
	},
	
	loadFacultys: function(e) {
		return this.collection.facid = e, this
	},
	
	loadSubsidiarys: function(e) {
		return this.collection.subid = e, this
	}
}), eUndac.Views.Rol_Header = Backbone.View.extend({
	tagName: "header",
	className: "content__header  content__header--interaction",
	events: {
		"click .js_button_new": "new"
	},
	
	initialize: function() {
		this.template = swig.compile($("#template_header_rol").html()), this.render()
	},
	
	render: function() {
		var e = this.template();
		
		return $(".js_content_main").prepend(this.$el.html(e)), this
	},
	
	"new": function(e) {
		e.preventDefault(), js_content_new, changeContent($(".js_content_main"), $(".js_content_new"))
	}
}), eUndac.Views.Rate_Header = Backbone.View.extend({
	tagName: "header",
	className: "content__header  content__header--interaction",
	events: {
		"change .js_select": "changeSelect",
		"change .js_selectperiods": "changeSelect2",
		"click .js_button_new": "new"
	},
	
	initialize: function(e) {
		this.model_collection = null, e.model_collection && (this.model_collection = e.model_collection), this.template = swig.compile($("#template_header_rate").html()), this.template_perid = swig.compile($("#template_header_period").html()), this.render()
	},
	
	render: function() {
		var e = new eUndac.Collections.Years,
			t = this;
		return t.years = e, e.fetch({
			success: function(e, n) {
				var i = n;
				yearc = i.current;
				var r = t.$el.html(t.template(i));
				$(".js_content_main").prepend(r), $(".js_select").val(yearc), $.ajax({
					url: "/restglobal/periodmin/" + yearc,
					type: "GET",
					success: function(e) {
						var n = t.template_perid(e);
						$(".js_selectperiods").html(n);
						for (var i = 0; i < e.periods.length; i++) if ("A" == e.periods[i].state) {
							var r = e.periods[i].perid;
							t.loadData(r)
						}
					},
					
					error: function() {
						console.log("Ocurrió un error al cargar las facultades")
					}
				})
			}
		}), t
	},
	
	cperiod: function(e) {
		var t = this;
		yearc = e, console.log(yearc), $.ajax({
			url: "/restglobal/periodmin/" + yearc,
			type: "GET",
			success: function(e) {
				var n = t.template_perid(e);
				$(".js_selectperiods").html(n)
			},
			
			error: function() {
				console.log("Ocurrió un error al cargar las facultades")
			}
		})
	},
	
	changeSelect: function(e) {
		var t = $(e.target);
		this.cperiod(t.val())
	},
	
	changeSelect2: function(e) {
		var t = $(e.target);
		this.loadData(t.val())
	},
	
	loadData: function(e) {
		this.collection.id = e, chargeContent($(".js_content_body"), this.collection)
	},
	
	"new": function(e) {
		e.preventDefault(), changeContent($(".js_content_main"), $(".js_content_new"));
		var t = $(".js_selectperiods").val();
		
		$("#js-period").val(t)
	}
}), eUndac.Views.PreregisterDelete = Backbone.View.extend({
	tagName: "section",
	className: "content content--interactive",
	id: "js_msg-confirm-delete",
	events: {
		"click .js_button_cancel_delete": "cancelDelete",
		"click .js_button_confirm_delete": "confirmDelete"
	},
	
	initialize: function(e) {
		this.template = swig.compile($("#template_preregister-delete").html()), this.render(), this.model_course = e.model_course
	},
	
	render: function() {
		var e = {
			attemps: 5 - this.model.toJSON().current_register.count_delete
		},
			t = this.$el.html(this.template(e));
		$("#js_success-delete").html(t)
	},
	
	cancelDelete: function() {
		$("#js_msg-confirm-delete").addClass("inactive"), setTimeout(function() {
			$("#js_msg-confirm-delete").removeClass("active inactive")
		}, 300)
	},
	
	confirmDelete: function(e) {
		$btn_delete_confirm = $(e.currentTarget), $btn_delete_confirm.attr("disabled", !0).html("Eliminando..."), $btn_delete_confirm.siblings(".js_button_cancel_delete").attr("disabled", !0), this.model_course.destroy({
			success: function(e, t) {
				t.success ? location.reload() : $btn_delete_confirm.removeAttr("disabled").html("Eliminar Prematricula")
			},
			
			error: function() {
				$btn_delete_confirm.removeAttr("disabled").html("Eliminar Prematricula")
			}
		})
	}
}), eUndac.Views.Paragraphs = Backbone.View.extend({
	initialize: function(e) {
		template_paragraph = swig.compile($("#template_paragraphs").html()), this.render(e.data_render), this.$where_render = e.where_render
	},
	
	render: function(e) {
		var t = this,
			n = template_paragraph(e);
		$("#js_main_spinner").addClass("fadeOut"), setTimeout(function() {
			$("#js_main_spinner").removeClass("fadeUp fadeOut"), t.$where_render.html(n)
		}, 300)
	}
}), eUndac.Views.PreregisterSubmit = Backbone.View.extend({
	tagName: "a",
	className: "button button--icon button--success",
	initialize: function(e) {
		this.template = swig.compile($("#template_button-submit").html()), this.render()
	},
	
	render: function() {
		var e = this.$el.html(this.template());
		$("#js_button_submit_side").html(e)
	}
}), eUndac.Views.PreregisterAuxiliar = Backbone.View.extend({
	tagName: "div",
	className: "helper  helper--item  helper--item--two",
	events: {
		"click .js_item-informative": "informativeDetail"
	},
	
	initialize: function(e) {
		this.template = swig.compile($("#template_auxiliar-one").html()), this.type = e.type, this.data_payments = null, this.data_credits = null, "PA" === this.type && (this.data_payments = this.model.toJSON(), this.data_credits = e.model_credits.toJSON())
	},
	
	render: function() {
		this.$el.html(this.template({
			type: this.type,
			data_payments: this.data_payments,
			data_credits: this.data_credits
		})), "PR" === this.type && (this.$el.removeClass("helper--item  helper--item--two"), this.$el.addClass("helper--button  button-large-right  fix-alone"))
	},
	
	renderPrint: function() {
		console.log("render")
	},
	
	informativeDetail: function(e) {
		$e = $(e.currentTarget), $e.hasClass("active") ? ($e.addClass("inactive"), setTimeout(function() {
			$e.removeClass("active inactive")
		}, 300)) : $e.addClass("active")
	}
}), eUndac.Routers.Base = Backbone.Router.extend({
	routes: {
		"": "index",
		period: "period",
		"register/preregister": "preregister",
		distribution: "distribution",
		faculty: "faculty",
		school: "school",
		organization: "organization",
		subsidiary: "subsidiary",
		person: "person",
		"courses/assigned/:val": "course_assigned",
		"courses/assigned": "course_assigned",
		"courses/syllabus/:val": "fill_syllabus",
		regularize: "regularize",
		rol: "rol",
		rate: "rate",
		"register/convalidation": "convalidation"
	},
	
	initialize: function() {
		Backbone.history.start({
			root: "/",
			pushState: !0
		})
	},
	
	index: function() {
		console.log("estoy en mi index")
	},
	
	period: function() {
		var e = new eUndac.Collections.Years;
		e.fetch();
		
		var t = new eUndac.Collections.Admin_Periods({
			id: null
		});
		
		e.on("add", function(e) {
			header_interaction = new eUndac.Views.Interaction_Header({
				model: e,
				collection: t
			})
		});
		
		new eUndac.Views.Period_Form({
			template: $("#template_content_new").html(),
			collection: t
		})
	},
	
	school: function() {
		var e = new eUndac.Collections.Schools({
			id: null
		});
		
		new eUndac.Views.Interaction_School({
			template: $("#template_header_school"),
			collection: e
		}), new eUndac.Views.School_Form({
			template: $("#js_content_new").html(),
			collection: e
		})
	},
	
	preregister: function() {
		var e = new eUndac.Models.UserPayment,
			t = new eUndac.Models.UserData,
			n = null,
			i = null;
		t.fetch({
			success: function(t, r) {
				var s = t,
					o = r;
				if (0 == r.current_register.impresion_count && "M" == r.current_register.state) var a = "I";
				else
				var a = r.current_register.state;
				var c = r.current_register.state_distribution;
				if ("B" === a && "C" === c) {
					var l = s.toJSON().main_info.uid,
						u = s.toJSON().main_info.perid;
					e.fetch({
						success: function(e, t) {
							var r = t.current_payment.state,
								c = new eUndac.Views.PreregisterAuxiliar({
									type: "PA",
									model: e,
									model_credits: s
								});
							
							if (c.render(), $(".js_auxiliar").html(c.$el), (!a || "B" === a) && o.conditions) {
								var d = o.conditions;
								d.forEach(function(e) {
									"CA" == e.code ? i = e.amount : "SA" == e.code && (n = e.amount)
								})
							}
							if ("EP" !== r && "LP" !== r && "OT" !== r) {
								var p = u.substring(2, 3),
									f = new Date,
									h = f.getFullYear();
								
								h = h.toString();
								
								var m = h.substring(2, 4),
									g = l.substring(0, 2);
								if (g == m && "A" == p) $("#js_main_spinner").addClass("fadeOut"), setTimeout(function() {
									$("#js_main_spinner").removeClass("fadeUp fadeOut"), $("#js_credits").addClass("hidden");
									new eUndac.Views.AutomaticRegister({
										model_user: s,
										model_payments: t,
										success_pre: a
									})
								}, 300);
								else {
									new eUndac.Collections.PreregisterCourses({
										model_user: s,
										model_payments: t,
										success_pre: a,
										more_semester: n,
										more_credits: i
									})
								}
							} else {
								new eUndac.Views.TypeError({
									model: e
								})
							}
						},
						
						error: function() {}
					})
				} else if ("I" === a || "M" === a) {
					new eUndac.Collections.PreregisterCourses({
						model_user: t,
						success_pre: a,
						more_semester: n,
						more_credits: i
					})
				} else if ("C" !== c) {
					new eUndac.Views.TypeError({
						type: "ED"
					})
				}
			},
			
			error: function() {
				console.log("Problema al traer datos de usuario...")
			}
		})
	},
	
	distribution: function() {
		console.log("call distributions")
	},
	
	faculty: function() {
		var e = new eUndac.Collections.Admin_Facultys;
		e.fetch();
		
		new eUndac.Views.Faculty_Header, new eUndac.Views.Faculty_Form({
			template: $("#js_content_new").html(),
			collection: e
		})
	},
	
	organization: function() {
		var e = new eUndac.Collections.Admin_Organizations;
		e.fetch();
		
		new eUndac.Views.Organization_Header, new eUndac.Views.Organizarion_Form({
			template: $("#js_content_new").html(),
			collection: e
		})
	},
	
	subsidiary: function() {
		var e = new eUndac.Collections.Admin_Subsidiarys;
		e.fetch();
		
		new eUndac.Views.Subsidiarys_Header, new eUndac.Views.Subsidiary_Form({
			template: $("#js_content_new").html(),
			collection: e
		})
	},
	
	regularize: function() {
		var e = new eUndac.Collections.Years;
		e.fetch(), e.on("add", function(e) {
			new eUndac.Views.Interaction_PeriodRegularize({
				model: e
			})
		})
	},
	
	person: function() {
		new eUndac.Views.Interaction_Person({
			template: $("#template_header_person")
		})
	},
	
	rol: function() {
		var e = new eUndac.Collections.Admin_Roles;
		e.fetch();
		
		new eUndac.Views.Rol_Header, new eUndac.Views.Rol_Form({
			template: $("#js_content_new").html(),
			collection: e
		})
	},
	
	course_assigned: function(e) {
		new eUndac.Views.Interaction_Courseassig({
			template: $("#template_header_course_assig").html(),
			val: e
		})
	},
	
	fill_syllabus: function(e) {
		console.log("hello sylabus")
	},
	
	rate: function() {
		var e = new eUndac.Collections.Rates({
			id: null
		});
		
		new eUndac.Views.Rate_Header({
			template: $("#template_header_rate"),
			collection: e
		}), new eUndac.Views.Rate_Form({
			template: $("#js_content_new").html(),
			collection: e
		})
	},
	
	convalidation: function() {
		new eUndac.Views.Interaction_HeaderConvalidation({
			template: $("#template_header_convalidation")
		})
	}
}), $(function() {
	$("#main_search_form").on("submit", function(e) {
		e.preventDefault();
		
		var t = $(this).find("input[type=text]").val();
		
		t && (location.href = "/default/global/search/data/" + t)
	});
	
	var e = global();
	
	e.toggleTabs($("ul.tabs"), $("ul.tabs").siblings(".tabs_data")), e.auxiliarVoh($("#js_auxiliar")), e.scrollOldAux(), eUndac.app = new eUndac.Routers.Base, $("input[js-type=date]").datepicker(), displayMainMenu()
});

var coursesCollection = null;
$(document).on("click", "a[href=#]", function(e) {
	e.preventDefault()
}), $(document).on("click", ".js-glo-message-options", function(e) {
	$(this).siblings(".message-button__message").hasClass("active") ? $(this).siblings(".message-button__message").removeClass("active") : ($("body").find(".message-button__message").removeClass("active"), $(this).siblings(".message-button__message").addClass("active"))
}), $(document).on("click", ".js-glo-message-options-close", function(e) {
	$(this).parent().parent().removeClass("active")
});