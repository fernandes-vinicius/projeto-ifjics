package br.edu.ifrn.projetoifjics.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.edu.ifrn.projetoifjics.app.enums.StatusEnum;
import br.edu.ifrn.projetoifjics.app.models.Pontuacao;

@Repository
public interface PontuacaoRepository extends JpaRepository<Pontuacao, Long> {

	@Query("SELECT p FROM Pontuacao p WHERE status = ?1")
	List<Pontuacao> findAllByStatus(StatusEnum status); 
}
