package br.edu.ifrn.projetoifjics.app.models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.ManyToMany;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIgnore;

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
public class Polo extends AbstractEntity {

	private static final long serialVersionUID = 1L;

	@NotNull(message = "O nome deve ser informado")
	@Column(length = 100)
	private String nome;

	@Column(length = 250)
	private String descricao;

	@ManyToMany
	@JoinTable(name = "Polo_Campus", joinColumns = { @JoinColumn(name = "Polo_id") }, inverseJoinColumns = {
			@JoinColumn(name = "Campus_id") })
    private List<Campus> campi = new ArrayList<>();

	@ManyToOne
	private Competicao competicao;

}