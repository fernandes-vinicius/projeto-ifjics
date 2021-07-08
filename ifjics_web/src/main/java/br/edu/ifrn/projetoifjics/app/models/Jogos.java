package br.edu.ifrn.projetoifjics.app.models;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
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
public class Jogos extends AbstractEntity {

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

	@ManyToMany
	@JoinTable(name = "Jogos_Campus", joinColumns = { @JoinColumn(name = "Jogos_id") }, inverseJoinColumns = {
			@JoinColumn(name = "Campus_id") })
	private List<Campus> campi = new ArrayList<>();

	@ManyToMany
	@JoinTable(name = "Jogos_Modalidade", joinColumns = { @JoinColumn(name = "Jogos_id") }, inverseJoinColumns = {
			@JoinColumn(name = "Modalidade_id") })
	private List<Modalidade> modalidades = new ArrayList<>();
	
	@OneToMany(mappedBy = "jogos")
	@JsonIgnore
	private List<Competicao> competicoes = new ArrayList<>();

}
