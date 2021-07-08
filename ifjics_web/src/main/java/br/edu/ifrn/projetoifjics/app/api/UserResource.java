package br.edu.ifrn.projetoifjics.app.api;

import static br.edu.ifrn.projetoifjics.app.enums.StatusEnum.ATIVO;
import static br.edu.ifrn.projetoifjics.app.enums.StatusEnum.INATIVO;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.edu.ifrn.projetoifjics.app.dtos.UserDto;
import br.edu.ifrn.projetoifjics.app.enums.RoleEnum;
import br.edu.ifrn.projetoifjics.app.models.Role;
import br.edu.ifrn.projetoifjics.app.models.User;
import br.edu.ifrn.projetoifjics.app.services.RoleService;
import br.edu.ifrn.projetoifjics.app.services.UserService;

@RestController
@RequestMapping("/api/v1/users")
public class UserResource {

	@Autowired
	private UserService userService;

	@Autowired
	private RoleService roleService;

	@GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> findAll() {

		List<User> users = userService.findAllByStatus(ATIVO);
		if (users.isEmpty())
			return new ResponseEntity<List<?>>(HttpStatus.NO_CONTENT);

		Collections.reverse(users);
		return new ResponseEntity<List<?>>(users, HttpStatus.OK);
	}

	@GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> findById(@PathVariable Long id) {

		User user = userService.findById(id);
		if (user != null && user.getStatus() != INATIVO)
			return ResponseEntity.ok(user);
		return ResponseEntity.notFound().build();
	}

	@PostMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> save(@Valid @RequestBody UserDto userDto) {

		Role roleUser = roleService.findByAuthority(RoleEnum.ROLE_USER);

		List<Role> rolesUser = new ArrayList<>();
		rolesUser.add(roleUser);

		User user = new User();
		user.setNome(userDto.getNome());
		user.setUsername(userDto.getUsername());
		user.setPassword(userDto.getPassword());
		user.setEmail(userDto.getEmail());
		user.setTelefone(userDto.getTelefone());
		user.setCampus(userDto.getCampus());
		user.setRoles(rolesUser);

		userService.save(user);
		return new ResponseEntity<User>(user, HttpStatus.CREATED);
	}

	// @PreAuthorize("hasAnyRole('ADM', 'MOD')")
	@PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody UserDto userDto) {

		User userDb = userService.findById(id);
		if (userDb != null) {

			BeanUtils.copyProperties(userDto, userDb, "id");
			userDb = userService.save(userDb);

			return ResponseEntity.ok(HttpStatus.OK);
		}
		return ResponseEntity.notFound().build();
	}

	// @PreAuthorize("hasAnyRole('ADM', 'MOD')")
	@DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> deleteById(@PathVariable Long id) {

		User userDb = userService.findById(id);
		if (userDb == null)
			return ResponseEntity.notFound().build();

		userService.remove(id);
		return ResponseEntity.ok(HttpStatus.OK);
	}

	@GetMapping(value = "/moderadores", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> findAllModeradores() {

		List<User> users = userService.findAllByStatus(ATIVO);
		if (users.isEmpty())
			return new ResponseEntity<List<?>>(HttpStatus.NO_CONTENT);

		List<User> moderadores = new ArrayList<>();
		for (User u : users) {

			List<Role> roles = u.getRoles();
			boolean isMod = roles.stream().filter(o -> o.getAuthority().equals(RoleEnum.ROLE_MOD.toString()))
					.findFirst().isPresent();
			boolean isAdm = roles.stream().filter(o -> o.getAuthority().equals(RoleEnum.ROLE_ADM.toString()))
					.findFirst().isPresent();

			if (isMod && !isAdm)
				moderadores.add(u);
		}

		Collections.reverse(moderadores);
		return new ResponseEntity<List<?>>(moderadores, HttpStatus.OK);
	}

	@GetMapping(value = "/usuarios", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> findAllUsuarios() {

		List<User> users = userService.findAllByStatus(ATIVO);
		if (users.isEmpty())
			return new ResponseEntity<List<?>>(HttpStatus.NO_CONTENT);

		List<User> usuarios = new ArrayList<>();
		for (User u : users) {

			List<Role> roles = u.getRoles();
			boolean isMod = roles.stream().filter(o -> o.getAuthority().equals(RoleEnum.ROLE_MOD.toString()))
					.findFirst().isPresent();
			boolean isAdm = roles.stream().filter(o -> o.getAuthority().equals(RoleEnum.ROLE_ADM.toString()))
					.findFirst().isPresent();

			if (!isMod && !isAdm)
				usuarios.add(u);
		}

		Collections.reverse(usuarios);
		return new ResponseEntity<List<?>>(usuarios, HttpStatus.OK);
	}

	@DeleteMapping(value = "/moderadores/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> removeModeradorById(@PathVariable Long id) {

		User userDb = userService.findById(id);

		if (!userDb.getRoles().isEmpty()) {
			userDb.getRoles().removeIf((Role role) -> role.getAuthority() == RoleEnum.ROLE_MOD.toString());
			userDb.setRoles(userDb.getRoles());
		}

		userService.save(userDb);
		return ResponseEntity.ok(HttpStatus.OK);
	}

	@GetMapping(value = "/administradores", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> findAllAdministradores() {

		List<User> users = userService.findAllByStatus(ATIVO);
		if (users.isEmpty())
			return new ResponseEntity<List<?>>(HttpStatus.NO_CONTENT);

		List<User> administradores = new ArrayList<>();
		for (User u : users) {

			List<Role> roles = u.getRoles();
			boolean isAdm = roles.stream().filter(o -> o.getAuthority().equals(RoleEnum.ROLE_ADM.toString()))
					.findFirst().isPresent();
			boolean isRoot = roles.stream().filter(o -> o.getAuthority().equals(RoleEnum.ROLE_ROOT.toString()))
					.findFirst().isPresent();

			if (isAdm && !isRoot)
				administradores.add(u);
		}

		Collections.reverse(administradores);
		return new ResponseEntity<List<?>>(administradores, HttpStatus.OK);
	}

	@DeleteMapping(value = "/administradores/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> removeAdministradorById(@PathVariable Long id) {

		User userDb = userService.findById(id);

		if (!userDb.getRoles().isEmpty()) {
			userDb.getRoles().removeIf((Role role) -> role.getAuthority() == RoleEnum.ROLE_ADM.toString());
			userDb.getRoles().removeIf((Role role) -> role.getAuthority() == RoleEnum.ROLE_MOD.toString());
			userDb.setRoles(userDb.getRoles());
		}

		userService.save(userDb);
		return ResponseEntity.ok(HttpStatus.OK);
	}

	@PutMapping(value = "/moderadores/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> createModerador(@PathVariable Long id) {

		User userDb = userService.findById(id);
		if (userDb != null) {

			List<Role> roles = userDb.getRoles();
			if (!roles.isEmpty()) {
				boolean isMod = roles.stream().filter(o -> o.getAuthority().equals(RoleEnum.ROLE_MOD.toString()))
						.findFirst().isPresent();

				if (!isMod) {
					Role roleMod = roleService.findByAuthority(RoleEnum.ROLE_MOD);
					roles.add(roleMod);
					userDb.setRoles(roles);
					userDb = userService.save(userDb);
				}

				return ResponseEntity.ok(HttpStatus.OK);
			}

		}
		return ResponseEntity.notFound().build();
	}

	@PutMapping(value = "/administradores/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> createAdministrador(@PathVariable Long id) {

		User userDb = userService.findById(id);
		if (userDb != null) {

			List<Role> roles = userDb.getRoles();
			if (!roles.isEmpty()) {
				boolean isAdm = roles.stream().filter(o -> o.getAuthority().equals(RoleEnum.ROLE_ADM.toString()))
						.findFirst().isPresent();

				if (!isAdm) {
					Role roleAdm = roleService.findByAuthority(RoleEnum.ROLE_ADM);
					roles.add(roleAdm);
					userDb.setRoles(roles);
					userDb = userService.save(userDb);
				}

				return ResponseEntity.ok(HttpStatus.OK);
			}

		}
		return ResponseEntity.notFound().build();
	}

	@GetMapping(value = "/user", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> search(@RequestParam("s") String search) {

		List<User> users = userService.search("%" + search.toLowerCase() + "%", ATIVO);
		if (users.isEmpty())
			return new ResponseEntity<List<?>>(HttpStatus.NO_CONTENT);

		List<User> usersNoModNoAdm = new ArrayList<>();
		for (User u : users) {

			List<Role> roles = u.getRoles();
			if (!roles.isEmpty()) {
				boolean isMod = roles.stream().filter(o -> o.getAuthority().equals(RoleEnum.ROLE_MOD.toString()))
						.findFirst().isPresent();
				boolean isAdm = roles.stream().filter(o -> o.getAuthority().equals(RoleEnum.ROLE_ADM.toString()))
						.findFirst().isPresent();

				if (!isMod && !isAdm)
					usersNoModNoAdm.add(u);
			}
		}

		if (usersNoModNoAdm.isEmpty())
			return new ResponseEntity<List<?>>(HttpStatus.NO_CONTENT);

		return new ResponseEntity<List<?>>(usersNoModNoAdm, HttpStatus.OK);
	}

}
