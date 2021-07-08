package br.edu.ifrn.projetoifjics.app.jobs;

import java.util.Calendar;
import java.util.Date;

import org.hibernate.type.TrueFalseType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import br.edu.ifrn.projetoifjics.app.enums.RoleEnum;
import br.edu.ifrn.projetoifjics.app.models.Campus;
import br.edu.ifrn.projetoifjics.app.models.Modalidade;
import br.edu.ifrn.projetoifjics.app.models.Competicao;
import br.edu.ifrn.projetoifjics.app.models.Jogos;
import br.edu.ifrn.projetoifjics.app.models.Partida;
import br.edu.ifrn.projetoifjics.app.models.Alerta;
import br.edu.ifrn.projetoifjics.app.models.PontuacaoParcial;
import br.edu.ifrn.projetoifjics.app.models.Role;
import br.edu.ifrn.projetoifjics.app.models.User;
import br.edu.ifrn.projetoifjics.app.models.Regulamento;
import br.edu.ifrn.projetoifjics.app.models.Recorde;
import br.edu.ifrn.projetoifjics.app.services.CampusService;
import br.edu.ifrn.projetoifjics.app.services.CompeticaoService;
import br.edu.ifrn.projetoifjics.app.services.PartidaService;
import br.edu.ifrn.projetoifjics.app.services.AlertaService;
import br.edu.ifrn.projetoifjics.app.services.JogosService;
import br.edu.ifrn.projetoifjics.app.services.ModalidadeService;
import br.edu.ifrn.projetoifjics.app.services.PontuacaoService;
import br.edu.ifrn.projetoifjics.app.services.PontuacaoParcialService;
import br.edu.ifrn.projetoifjics.app.services.RegulamentoService;
import br.edu.ifrn.projetoifjics.app.services.RecordeService;
import br.edu.ifrn.projetoifjics.app.services.RoleService;
import br.edu.ifrn.projetoifjics.app.services.UserService;

@Component
public class Initializer implements ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    private RoleService roleService;

    @Autowired
    private UserService userService;

    @Autowired
    private CampusService campusService;

    @Autowired
    private ModalidadeService modalidadeService;

    @Autowired
    private PartidaService partidaService;

    @Autowired
    private AlertaService AlertaService;

    @Autowired
    private RegulamentoService regulamentoService;

    @Autowired
    private RecordeService recordeService;

    @Autowired
    private CompeticaoService competicaoService;

    @Autowired
    private JogosService jogosService;

    @Autowired
    private PontuacaoService pontuacaoService;

    @Autowired
    private PontuacaoParcialService pontuacaoParcialService;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {

        // Utils Variables
        // Date dt = new Date(2018 / 2 / 12);

        // Calendar c = Calendar.getInstance();

        /**
         * ROOT USER
         *
         * Este usuário têm permissão máxima sobre qualquer outro usuário. Portanto o
         * mesmo não deve ser apagado.
         */
        if (userService.findByUsername("root") == null) {
            /**
             * ROLES
             */

            Role roleRoot = new Role();
            roleRoot.setAuthority(RoleEnum.ROLE_ROOT);
            roleService.save(roleRoot);

            Role roleAdm = new Role();
            roleAdm.setAuthority(RoleEnum.ROLE_ADM);
            roleService.save(roleAdm);

            Role roleMod = new Role();
            roleMod.setAuthority(RoleEnum.ROLE_MOD);
            roleService.save(roleMod);

            Role roleUser = new Role();
            roleUser.setAuthority(RoleEnum.ROLE_USER);
            roleService.save(roleUser);
            User root = new User();
            root.setNome("Root");
            root.setEmail("root@root.com");
            root.setUsername("root");
            root.setPassword("63a9f0ea");
            root.setTelefone("84999954310");
            root.getRoles().add(roleRoot);
            root.getRoles().add(roleAdm);
            root.getRoles().add(roleMod);
            root.getRoles().add(roleUser);
            userService.save(root);
        }

        /**
         * USERS
         */
        // User adm = new User();
        // adm.setNome("Administrador");
        // adm.setEmail("adm@gmail.com");
        // adm.setTelefone("84999954301");
        // adm.setUsername("adm");
        // adm.setPassword("123");
        // adm.getRoles().add(roleAdm);

        // adm.getRoles().add(roleUser);
        // userService.save(adm);

        // User mod = new User();
        // mod.setNome("Moderador");
        // mod.setEmail("moderador@gmail.com");
        // mod.setTelefone("84999954302");
        // mod.setUsername("mod");
        // mod.setPassword("123");
        // mod.getRoles().add(roleMod);
        // mod.getRoles().add(roleUser);
        // userService.save(mod);

        /**
         * USERS BOTS
         */
        // int numberBots = 100;
        // for (int i = 1; i <= numberBots; i++) {
        // User u = new User();
        // u.setNome("Bot " + i);
        // u.setUsername("bot_" + i);
        // u.setPassword("bot");
        //
        // u.setEmail("bot_".concat(String.valueOf(i)).concat("@").concat("gmail.com"));
        // u.setTelefone("849" + new Random().nextInt(9) + new Random().nextInt(9) +
        // new
        // Random().nextInt(9)
        // + new Random().nextInt(9) + new Random().nextInt(9) + new
        // Random().nextInt(9)
        // + new Random().nextInt(9) + new Random().nextInt(9));
        // u.getRoles().add(roleUser);
        // userService.save(u);
        // }

        /**
         * MODALIDADES
         */
        // Modalidade modalidade1 = new Modalidade();
        // modalidade1.setNome("Canoagem");
        // modalidadeService.save(modalidade1);

        // Modalidade modalidade2 = new Modalidade();
        // modalidade2.setNome("Voley");
        // modalidadeService.save(modalidade2);

        // Modalidade modalidade3 = new Modalidade();
        // modalidade3.setNome("Natação");
        // modalidadeService.save(modalidade3);

        // Modalidade modalidade4 = new Modalidade();
        // modalidade4.setNome("Xadrez");
        // modalidadeService.save(modalidade4);

        // Modalidade modalidade5 = new Modalidade();
        // modalidade5.setNome("Atletismo");
        // modalidadeService.save(modalidade5);

        // Modalidade modalidade6 = new Modalidade();
        // modalidade6.setNome("Basquete");
        // modalidadeService.save(modalidade6);

        // Modalidade modalidade7 = new Modalidade();
        // modalidade7.setNome("Handebal");
        // modalidadeService.save(modalidade7);

        // Modalidade modalidade8 = new Modalidade();
        // modalidade8.setNome("Box");
        // modalidadeService.save(modalidade8);

        // Modalidade modalidade9 = new Modalidade();
        // modalidade9.setNome("Ciclismo");
        // modalidadeService.save(modalidade9);

        // Modalidade modalidade10 = new Modalidade();
        // modalidade10.setNome("Ginástica Artística");
        // modalidadeService.save(modalidade10);

        // Modalidade modalidade11 = new Modalidade();
        // modalidade11.setNome("Halterofilismo");
        // modalidadeService.save(modalidade11);

        // Modalidade modalidade12 = new Modalidade();
        // modalidade12.setNome("Badminton");
        // modalidadeService.save(modalidade12);

        // Modalidade modalidade13 = new Modalidade();
        // modalidade13.setNome("Beisebol");
        // modalidadeService.save(modalidade13);

        // Modalidade modalidade14 = new Modalidade();
        // modalidade14.setNome("Futsal");
        // modalidadeService.save(modalidade14);

        // Modalidade modalidade15 = new Modalidade();
        // modalidade15.setNome("Futebol");
        // modalidadeService.save(modalidade15);

        /**
         * REGULAMENTOS
         */

        // Regulamento regulamento1 = new Regulamento();
        // regulamento1.setNome("Regulamento geral");
        // regulamento1.setLink(
        // "http://portal.ifrn.edu.br/ifrn/servidores/jogos-intercampi/2018/lateral/regulamentos/regulamento-geral");
        // regulamentoService.save(regulamento1);

        // Regulamento regulamento2 = new Regulamento();
        // regulamento2.setNome("Atletismo");
        // regulamento2.setLink(
        // "http://portal.ifrn.edu.br/ifrn/servidores/jogos-intercampi/2018/lateral/regulamentos/regulamento-especifico-atletismo");
        // regulamentoService.save(regulamento2);

        /**
         * RECORDES
         */

        /**
         * CAMPUS
         */
        // Campus campus1 = new Campus();
        // campus1.setNome("Natal Central");
        // campusService.save(campus1);

        // Campus campus2 = new Campus();
        // campus2.setNome("Pau dos Ferros");
        // campus2.setDescricao("O campus Pau dos Ferros possui 3 cursos técnicos e 2
        // graduações");
        // campus2.setLocalizacao("Chico Cajá, PDF-RN");
        // campusService.save(campus2);

        // Campus campus3 = new Campus();
        // campus3.setNome("Macau");
        // campusService.save(campus3);

        // Campus campus4 = new Campus();
        // campus4.setNome("Parnamirim");
        // campusService.save(campus4);

        // Campus campus5 = new Campus();
        // campus5.setNome("São Gonçalo do Amarante");
        // campusService.save(campus5);

        // Campus campus6 = new Campus();
        // campus6.setNome("Caicó");
        // campusService.save(campus6);

        // Campus campus7 = new Campus();
        // campus7.setNome("Mossoró");
        // campusService.save(campus7);

        // Campus campus8 = new Campus();
        // campus8.setNome("Reitoria");
        // campusService.save(campus8);

        // Campus campus9 = new Campus();
        // campus9.setNome("Apodi");
        // campusService.save(campus9);

        // Campus campus10 = new Campus();
        // campus10.setNome("João Câmara");
        // campusService.save(campus10);

        // Campus campus11 = new Campus();
        // campus11.setNome("Ipanguaçu");
        // campusService.save(campus11);

        // Campus campus12 = new Campus();
        // campus12.setNome("Santa Cruz");
        // campusService.save(campus12);

        // Campus campus13 = new Campus();
        // campus13.setNome("São Paulo do Potengi");
        // campusService.save(campus13);

        // Campus campus14 = new Campus();
        // campus14.setNome("Canguaretama");
        // campusService.save(campus14);

        // Campus campus15 = new Campus();
        // campus15.setNome("Nova Cruz");
        // campusService.save(campus15);

        // Campus campus16 = new Campus();
        // campus16.setNome("Parelhas");
        // campusService.save(campus16);

        // Campus campus17 = new Campus();
        // campus17.setNome("Ceará Mirim");
        // campusService.save(campus17);

        // Campus campus18 = new Campus();
        // campus18.setNome("Lajes");
        // campusService.save(campus18);

        // Campus campus19 = new Campus();
        // campus19.setNome("Cidade Alta");
        // campusService.save(campus19);

        // Campus campus20 = new Campus();
        // campus20.setNome("Currais Novos");
        // campusService.save(campus20);

        // Campus campus21 = new Campus();
        // campus21.setNome("Zona Norte");
        // campusService.save(campus21);

        /**
         * Alertas
         */
        // Alerta teste = new Alerta();
        // teste.setNome("teste");
        // AlertaService.save(teste);

        /**
         * COMPETICÕES
         */
        // Competicao competicao1 = new Competicao();
        // competicao1.setNome("Torneio de Futsal Masculino");

        // competicao1.setInicio(new Date());
        // //
        // c.setTime(dt);
        // c.add(Calendar.DATE, 7);
        // dt = c.getTime();
        // //
        // competicao1.setFim(dt);
        // competicao1.setLocal("Ginásio Poliesportivo - IFRN Campus PDF");
        // competicao1.setHora("19:00");
        // competicao1.setModalidade(modalidade1);
        // competicaoService.save(competicao1);
        // //
        // Competicao competicao2 = new Competicao();
        // competicao2.setNome("Circuito");
        // competicao2.setInicio(new Date());
        // competicao2.setFim(new Date());

        // Competicao competicao3 = new Competicao();
        // competicao3.setNome("Torneio de Futsal Feminino");

        // competicao3.setInicio(new Date());
        // //
        // // c.setTime(dt);
        // // c.add(Calendar.DATE, 7);
        // // dt = c.getTime();
        // //
        // competicao3.setFim(new Date());

        // c.setTime(dt);
        // c.add(Calendar.DATE, 7);
        // dt = c.getTime();

        // competicao2.setFim(dt);
        // competicao2.setLocal("Ginásio Poliesportivo - IFRN Campus PDF");
        // competicao2.setHora("19:00");
        // competicao2.setModalidade(modalidade2);
        // competicaoService.save(competicao2);
        /**
         * Partidas
         */
        // Partida partida = new Partida();
        // partida.setNome("teste");
        // partida.setData(dt);
        // partidaService.save(partida);

        // Partida partida2 = new Partida();
        // partida2.setNome("Final de Futsal");
        // partida2.setData(new Date());

        // partidaService.save(partida2);

        // Partida partida3 = new Partida();
        // partida3.setNome("Semifinal");

        // partida3.setData(new Date());
        // partidaService.save(partida3);

        /**
         * JOGOS
         */
        // Jogos jogos1 = new Jogos();
        // jogos1.setNome("JICS antigo");
        // jogos1.setInicio(dt);
        // //
        // c.setTime(dt);
        // c.add(Calendar.DATE, 7);
        // dt = c.getTime();

        // jogos1.setFim(dt);
        // jogos1.getCampi().add(campus1);
        // jogos1.getCampi().add(campus2);
        // jogos1.getCampi().add(campus3);
        // jogos1.getCampi().add(campus4);
        // jogosService.save(jogos1);
        // Jogos jogos2 = new Jogos();
        // jogos2.setNome("JICS antigo");
        // jogos2.setInicio(dt);
        // //
        // c.setTime(dt);
        // c.add(Calendar.DATE, 7);
        // dt = c.getTime();

        // jogos2.setFim(dt);
        // jogos2.getCampi().add(campus1);
        // jogos2.getCampi().add(campus2);
        // jogos2.getCampi().add(campus3);
        // jogos2.getCampi().add(campus4);
        // jogos1.getModalidades().add(modalidade1);
        // jogos1.getModalidades().add(modalidade2);
        // jogos1.getCompeticoes().add(competicao1);
        // jogos1.getCompeticoes().add(competicao2);
        // jogosService.save(jogos2);
        // //
        // modalidade1.getJogos().add(jogos1);
        // modalidade2.getJogos().add(jogos1);
        //
        // campus1.getJogos().add(jogos1);
        // campus2.getJogos().add(jogos1);
        // campus3.getJogos().add(jogos1);
        // campus4.getJogos().add(jogos1);
        //
        // Jogos jogos3 = new Jogos();
        // jogos3.setNome("JICS 2020.1");
        // jogos3.setInicio(new Date());
        // jogos3.setFim(new Date());
        // jogos3.getCampi().add(campus1);
        // jogos3.getCampi().add(campus2);
        // jogos3.getCampi().add(campus3);
        // jogos3.getCampi().add(campus4);
        // jogosService.save(jogos3);

        // Jogos jogos4 = new Jogos();
        // jogos4.setNome("JICS 2020.2");
        // jogos4.setInicio(new Date());

        // jogos4.setFim(new Date());
        // jogos4.getCampi().add(campus1);
        // jogos4.getCampi().add(campus2);
        // jogos4.getCampi().add(campus3);
        // jogos4.getCampi().add(campus4);
        // jogosService.save(jogos4);

        // competicao1.setJogos(jogos1);
        // competicao2.setJogos(jogos1);
        // competicao3.setJogos(jogos1);
        // competicaoService.save(competicao1);
        // competicaoService.save(competicao2);
        // competicaoService.save(competicao3);

        /**
         * PONTUAÇÕES
         */
        // Pontuacao pontuacao1 = new Pontuacao();
        // pontuacao1.setCampus(campus1);
        // pontuacao1.setColocacao(1);
        // pontuacao1.setPontos(5);
        // pontuacao1.setBonus(5);
        // pontuacao1.setOuro(pontuacao1.getPontos());
        // pontuacao1.setTotal(pontuacao1.getPontos() + pontuacao1.getBonus());
        //
        // Pontuacao pontuacao2 = new Pontuacao();
        // pontuacao2.setCampus(campus2);
        // pontuacao2.setColocacao(2);
        // pontuacao2.setPontos(3);
        // pontuacao2.setBonus(0);
        // pontuacao2.setPrata(pontuacao2.getPontos());
        // pontuacao2.setTotal(pontuacao2.getPontos() + pontuacao2.getBonus());
        //
        // Pontuacao pontuacao3 = new Pontuacao();
        // pontuacao3.setCampus(campus3);
        // pontuacao3.setColocacao(3);
        // pontuacao3.setPontos(1);
        // pontuacao3.setBonus(0);
        // pontuacao3.setBronze(pontuacao3.getPontos());
        // pontuacao3.setTotal(pontuacao3.getPontos() + pontuacao3.getBonus());
        //
        // Pontuacao pontuacao4 = new Pontuacao();
        // pontuacao4.setCampus(campus4);
        // pontuacao4.setColocacao(4);
        // pontuacao4.setPontos(0);
        // pontuacao4.setBonus(0);
        // pontuacao4.setTotal(pontuacao4.getPontos() + pontuacao4.getBonus());
        //
        // Pontuacao pontuacao5 = new Pontuacao();
        // pontuacao5.setCampus(campus5);
        // pontuacao5.setColocacao(5);
        // pontuacao5.setPontos(0);
        // pontuacao5.setBonus(0);
        // pontuacao5.setTotal(pontuacao5.getPontos() + pontuacao5.getBonus());
        //
        // // Mais pontuações
        // Pontuacao pontuacao6 = new Pontuacao();
        // pontuacao6.setCampus(campus1);
        // pontuacao6.setColocacao(1);
        // pontuacao6.setPontos(5);
        // pontuacao6.setBonus(0);
        // pontuacao6.setOuro(pontuacao6.getPontos());
        // pontuacao6.setTotal(pontuacao6.getPontos() + pontuacao6.getBonus());
        //
        // Pontuacao pontuacao7 = new Pontuacao();
        // pontuacao7.setCampus(campus19);
        // pontuacao7.setColocacao(2);
        // pontuacao7.setPontos(3);
        // pontuacao7.setBonus(0);
        // pontuacao7.setPrata(pontuacao7.getPontos());
        // pontuacao7.setTotal(pontuacao7.getPontos() + pontuacao7.getBonus());
        //
        // Pontuacao pontuacao8 = new Pontuacao();
        // pontuacao8.setCampus(campus18);
        // pontuacao8.setColocacao(3);
        // pontuacao8.setPontos(1);
        // pontuacao8.setBonus(0);
        // pontuacao8.setBronze(pontuacao8.getPontos());
        // pontuacao8.setTotal(pontuacao8.getPontos() + pontuacao8.getBonus());
        //
        // Pontuacao pontuacao9 = new Pontuacao();
        // pontuacao9.setCampus(campus17);
        // pontuacao9.setColocacao(4);
        // pontuacao9.setPontos(0);
        // pontuacao9.setBonus(0);
        // pontuacao9.setTotal(pontuacao9.getPontos() + pontuacao9.getBonus());
        //
        // Pontuacao pontuacao10 = new Pontuacao();
        // pontuacao10.setCampus(campus16);
        // pontuacao10.setColocacao(5);
        // pontuacao10.setPontos(0);
        // pontuacao10.setBonus(0);
        // pontuacao10.setTotal(pontuacao10.getPontos() + pontuacao10.getBonus());
        //
        // pontuacao1.setCompeticao(competicao1);
        // pontuacao2.setCompeticao(competicao1);
        // pontuacao3.setCompeticao(competicao1);
        // pontuacao4.setCompeticao(competicao1);
        // pontuacao5.setCompeticao(competicao1);
        //
        // pontuacao6.setCompeticao(competicao2);
        // pontuacao7.setCompeticao(competicao2);
        // pontuacao8.setCompeticao(competicao2);
        // pontuacao9.setCompeticao(competicao2);
        // pontuacao10.setCompeticao(competicao2);
        //
        // pontuacaoService.save(pontuacao2);
        // pontuacaoService.save(pontuacao3);
        // pontuacaoService.save(pontuacao1);
        // pontuacaoService.save(pontuacao5);
        // pontuacaoService.save(pontuacao4);
        //
        // pontuacaoService.save(pontuacao6);
        // pontuacaoService.save(pontuacao10);
        // pontuacaoService.save(pontuacao7);
        // pontuacaoService.save(pontuacao9);
        // pontuacaoService.save(pontuacao8);
    }

}
