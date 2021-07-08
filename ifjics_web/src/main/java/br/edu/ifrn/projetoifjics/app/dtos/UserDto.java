package br.edu.ifrn.projetoifjics.app.dtos;

import java.io.Serializable;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import javax.persistence.ManyToOne;
import br.edu.ifrn.projetoifjics.app.models.Campus;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class UserDto implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Column(length = 50)
	private String nome;

	@NotNull(message = "O nome de usuário deve ser informado")
	@Column(unique = true, length = 20)
	private String username;

	@NotNull(message = "A senha deve ser informada")
	private String password;

	@Column(unique = true, length = 50)
	private String email;

	@Column(length = 11)
	private String telefone;

	@ManyToOne
	private Campus campus;

}
