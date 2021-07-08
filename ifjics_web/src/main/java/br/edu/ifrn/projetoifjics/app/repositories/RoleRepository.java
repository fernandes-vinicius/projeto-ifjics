package br.edu.ifrn.projetoifjics.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.edu.ifrn.projetoifjics.app.enums.RoleEnum;
import br.edu.ifrn.projetoifjics.app.enums.StatusEnum;
import br.edu.ifrn.projetoifjics.app.models.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

	Role findByAuthority(RoleEnum authority);
	
	@Query("SELECT r FROM Role r WHERE status = ?1")
	List<Role> findAllByStatus(StatusEnum status);
}
