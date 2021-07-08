package br.edu.ifrn.projetoifjics.app.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import static br.edu.ifrn.projetoifjics.app.enums.StatusEnum.*;
import br.edu.ifrn.projetoifjics.app.models.Jogos;
import br.edu.ifrn.projetoifjics.app.services.JogosService;

@Controller
@RequestMapping("/pontuacoes")
public class PontuacoesController {

	@Autowired
	private JogosService jogosService;

	@GetMapping("/geral")
	public ModelAndView geral() {
		List<Jogos> jogosList = jogosService.findAllByStatus(ATIVO);

		ModelAndView mv = new ModelAndView("pontuacoes/geral");
		mv.addObject("jogos", jogosList);

		return mv;
	}

}
