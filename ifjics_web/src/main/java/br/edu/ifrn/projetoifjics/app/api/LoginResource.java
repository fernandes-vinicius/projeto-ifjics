package br.edu.ifrn.projetoifjics.app.api;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.edu.ifrn.projetoifjics.app.dtos.UserLoginDto;
import br.edu.ifrn.projetoifjics.app.enums.StatusEnum;
import br.edu.ifrn.projetoifjics.app.models.User;
import br.edu.ifrn.projetoifjics.app.services.UserService;

@RestController
@RequestMapping("/api/v1/login")
public class LoginResource {

	@Autowired
	private UserService userService;

	@PostMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> login(@RequestBody @Valid UserLoginDto userLoginDto) {

		User user = userService.findByUsernameOrEmailOrTelefone(userLoginDto.getLogin(), StatusEnum.ATIVO);
		if (user != null)
			if (new BCryptPasswordEncoder().matches(userLoginDto.getPassword(), user.getPassword()))
				return ResponseEntity.ok(user);
		return ResponseEntity.notFound().build();
	}

}
