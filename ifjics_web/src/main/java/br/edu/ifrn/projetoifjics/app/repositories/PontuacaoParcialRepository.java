package br.edu.ifrn.projetoifjics.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.edu.ifrn.projetoifjics.app.enums.StatusEnum;
import br.edu.ifrn.projetoifjics.app.models.PontuacaoParcial;

@Repository
public interface PontuacaoParcialRepository extends JpaRepository<PontuacaoParcial, Long> {

	@Query("SELECT p FROM PontuacaoParcial p WHERE status = ?1")
    List<PontuacaoParcial> findAllByStatus(StatusEnum status); 

	@Query("SELECT p FROM PontuacaoParcial p WHERE partida_id = ?1 AND status = ?2")
	List<PontuacaoParcial> findAllByPartida(Long id, StatusEnum status);
}
