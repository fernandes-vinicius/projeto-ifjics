package br.edu.ifrn.projetoifjics.app.models;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.NotNull;

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
public class Competicao extends AbstractEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@NotNull(message = "O nome deve ser informado")
	@Column(length = 50)
	private String nome;

	@Temporal(TemporalType.DATE)
	private Date inicio;

	@Temporal(TemporalType.DATE)
	private Date fim;

	// @Column(length = 100)
	// private String local;

	// // @Temporal(TemporalType.TIME)
	// @Column(length = 5)
	// private String hora;

	@Column(length = 50)
	private String unidadeMedida;

	@Column(nullable = false)
	private int modalidadeColetiva;

	// @ManyToOne
	// private Modalidade modalidade;

	@ManyToOne
	// @JsonIgnore
	private Jogos jogos;

	@OneToMany(mappedBy = "competicao", cascade = CascadeType.ALL)
	private List<Pontuacao> pontuacoes = new ArrayList<>();

}
