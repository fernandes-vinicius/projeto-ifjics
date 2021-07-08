package br.edu.ifrn.projetoifjics.app.models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Campus extends AbstractEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@NotNull(message = "O nome deve ser informado")
	@Column(length = 50)
	private String nome;
	
	@Column(length = 250)
	private String descricao;

	@Column(length = 100)
	private String localizacao;	

	@ManyToMany(mappedBy = "campi")
	@JsonIgnore
	private List<Jogos> jogos = new ArrayList<>();

}
