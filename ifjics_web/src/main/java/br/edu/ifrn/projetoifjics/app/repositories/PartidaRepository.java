package br.edu.ifrn.projetoifjics.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.edu.ifrn.projetoifjics.app.enums.StatusEnum;
import br.edu.ifrn.projetoifjics.app.models.Partida;

@Repository
public interface PartidaRepository extends JpaRepository<Partida, Long> {

	@Query("SELECT c FROM Partida c WHERE status = ?1")
	List<Partida> findAllByStatus(StatusEnum status);

	@Query("SELECT c FROM Partida c WHERE competicao_id = ?1 AND status = ?2")
	List<Partida> findAllByCompeticao(Long id, StatusEnum status);

	@Query(value = "SELECT * FROM Partida WHERE (LOWER(nome) LIKE ?1 OR competicao_id IN (SELECT c.id FROM Competicao c where LOWER(nome) LIKE ?1)) AND status = 'ATIVO'", nativeQuery = true)
	List<Partida> search(String search, StatusEnum status);
}