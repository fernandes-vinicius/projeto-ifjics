package br.edu.ifrn.projetoifjics.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.edu.ifrn.projetoifjics.app.enums.StatusEnum;
import br.edu.ifrn.projetoifjics.app.models.Regulamento;

@Repository
public interface RegulamentoRepository extends JpaRepository<Regulamento, Long> {

	@Query("SELECT r FROM Regulamento r WHERE status = ?1")
	List<Regulamento> findAllByStatus(StatusEnum status);
}