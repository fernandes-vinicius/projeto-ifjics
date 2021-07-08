package br.edu.ifrn.projetoifjics.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.edu.ifrn.projetoifjics.app.enums.StatusEnum;
import br.edu.ifrn.projetoifjics.app.models.Competicao;

@Repository
public interface CompeticaoRepository extends JpaRepository<Competicao, Long> {

	@Query("SELECT c FROM Competicao c WHERE status = ?1")
	List<Competicao> findAllByStatus(StatusEnum status);

	@Query("SELECT c FROM Competicao c WHERE jogos_id = ?1 AND status = ?2")
	List<Competicao> findAllByJogos(Long id, StatusEnum status);

	@Query(value = "SELECT c FROM Competicao c WHERE LOWER(nome) LIKE ?1 AND status = ?2")
	List<Competicao> search(String search, StatusEnum status);
}
