package br.edu.ifrn.projetoifjics.app.models;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.CascadeType;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.ManyToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
public class Partida extends AbstractEntity {

	private static final long serialVersionUID = 1L;

	@NotNull(message = "O nome deve ser informado")
	@Column(length = 100)
	private String nome;

	@Temporal(TemporalType.DATE)
	private Date data;

	@Column(length = 100)
	private String local;

	// @Temporal(TemporalType.TIME)
	@Column(length = 10)
	private String hora;

	@ManyToMany
	@JoinTable(name = "Partida_Campus", joinColumns = { @JoinColumn(name = "Partida_id") }, inverseJoinColumns = {
			@JoinColumn(name = "Campus_id") })
	private List<Campus> campi = new ArrayList<>();

	@ManyToMany

	@JoinTable(name = "Partida_User", joinColumns = { @JoinColumn(name = "Partida_id") }, inverseJoinColumns = {
			@JoinColumn(name = "User_id") })
	private List<User> user = new ArrayList<>();

	@ManyToMany
	@JoinTable(name = "Partida_Polo", joinColumns = { @JoinColumn(name = "Partida_id") }, inverseJoinColumns = {
			@JoinColumn(name = "Polo_id") })
	private List<Polo> polos = new ArrayList<>();
	
	@ManyToOne
	private Competicao competicao;

}