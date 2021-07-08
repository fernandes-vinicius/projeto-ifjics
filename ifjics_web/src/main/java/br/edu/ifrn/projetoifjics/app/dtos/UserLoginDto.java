package br.edu.ifrn.projetoifjics.app.dtos;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class UserLoginDto {

	@NotNull(message = "O nome de usuário, email ou telefone deve ser informado")
	@Column(length = 50)
	private String login;

	@NotNull(message = "A senha deve ser informada")
	private String password;

}
