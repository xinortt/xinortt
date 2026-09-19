const I = (name, category, icon, stage, method, difficulty, biome, desc, effect, obtain, balance) => ({
  name, category, icon, stage, method, difficulty, biome, desc, effect, obtain, balance,
});

const ideas = [
  // Espadas y combate (12)
  I("Hoja del Eco", "Armas", "⚔", "Endgame", "Plugin Paper", "Media", "Deep Dark", "Espada nacida del silencio de las ciudades antiguas.", "Agacharse sin recibir daño carga una onda sónica para el siguiente golpe.", "Fragmentos de eco + espada de netherita en una forja especial.", "Una carga, 12 s de enfriamiento; nunca atraviesa escudos."),
  I("Sable de Brasa", "Armas", "♨", "Medio", "Plugin Paper", "Simple", "Nether", "Arma agresiva que conserva el calor de los Blazes.", "Tres golpes seguidos encienden al objetivo; fallar reinicia la cadena.", "Vara de Blaze, lingote de oro y espada de diamante.", "Menos daño base que diamante; gana por constancia."),
  I("Espada del Micelio", "Armas", "♣", "Inicio", "Datapack", "Simple", "Isla de hongos", "Hoja cubierta por esporas defensivas.", "Al derrotar un enemigo deja una nube breve que ralentiza monstruos.", "Botín de Mooshroom marrón durante tormenta.", "La nube no afecta jugadores y dura 2 s."),
  I("Filo del Peregrino", "Armas", "⌁", "Inicio", "Pack+Datapack", "Simple", "Overworld", "Espada que recompensa viajar lejos del spawn.", "Gana durabilidad temporal al descubrir una estructura nueva.", "Premio por completar cuatro avances de exploración.", "La mejora no aumenta daño ni se acumula."),
  I("Mandoble de Cuarzo", "Armas", "◇", "Medio", "Plugin Paper", "Media", "Nether", "Espada pesada, blanca y precisa.", "Ataques cargados rompen postura y desactivan escudo por un instante.", "Cuarzo comprimido y plantilla de bastión.", "Ataque 25% más lento; sin combo de crítico."),
  I("Daga de Coral", "Armas", "Ψ", "Inicio", "Plugin Paper", "Simple", "Océano", "Arma ligera para ruinas y templos submarinos.", "Bajo el agua ataca más rápido y concede 1 s de respiración al matar.", "Coral muerto, prismarina y fragmento de cobre.", "Daño bajo en tierra; respiración no se acumula."),
  I("Martillo del Yunque", "Armas", "⬙", "Medio", "Plugin Paper", "Media", "Minas", "Maza de herrero hecha para control, no daño puro.", "Golpear un bloque crea retroceso alrededor del impacto.", "Reparar 100 objetos y entregar un yunque dañado.", "Pierde mucha durabilidad; 8 s de enfriamiento."),
  I("Guadaña de la Cosecha", "Armas", "☾", "Medio", "Plugin Paper", "Media", "Campos", "Herramienta ceremonial de granjero y arma de área.", "Corta cultivos maduros en 3×3 y hace barrido amplio con poco daño.", "Festival de cosecha o contrato agrícola.", "No activa Fortuna; el combate consume 2 de durabilidad."),
  I("Estoque de Ender", "Armas", "↗", "Endgame", "Plugin Paper", "Alta", "End", "Hoja fina que desplaza al duelista.", "Un ataque al aire teletransporta 3 bloques hacia delante.", "Perla estabilizada, aliento de dragón y espada de netherita.", "Usa hambre y tiene 7 s de enfriamiento."),
  I("Cuchilla del Saqueador", "Armas", "⌁", "Medio", "Datapack", "Simple", "Puesto de saqueadores", "Espada dentada obtenida defendiendo aldeas.", "Hace daño adicional solo a mobs de incursión.", "Recompensa rara del capitán durante una incursión alta.", "No mejora el botín y es normal contra jugadores."),
  I("Alabarda de la Cabra", "Armas", "†", "Medio", "Plugin Paper", "Media", "Montaña", "Arma de asta inspirada en los cuernos de cabra.", "Correr antes de golpear empuja con fuerza y reproduce un cuerno.", "Dos cuernos distintos, cobre y asta encantada.", "Requiere 8 bloques de carrera; mala en espacios cerrados."),
  I("Maza de Gravedad", "Armas", "●", "Endgame", "Plugin Paper", "Alta", "Trial Chambers", "Variante lateral de la maza centrada en control.", "El golpe de caída atrae enemigos antes del impacto.", "Núcleo pesado + fragmentos de brisa + prueba ominosa.", "Atracción máxima de 4 bloques y enfriamiento de 15 s."),

  // Herramientas (12)
  I("Pico de Veta", "Herramientas", "⛏", "Inicio", "Plugin Paper", "Media", "Minas", "Pico que reconoce minerales conectados.", "Agacharse al romper muestra cuántos minerales iguales tocan el bloque.", "Hierro, redstone y amatista.", "Solo informa; no mina toda la veta."),
  I("Pico Sísmico", "Herramientas", "⛏", "Endgame", "Plugin Paper", "Alta", "Deep Dark", "Herramienta de minería por pulsos.", "Un uso especial rompe una línea 1×1 de hasta 5 bloques de piedra.", "Eco reforzado y netherita.", "No rompe contenedores, minerales ni protección; 20 s."),
  I("Pico de Geoda", "Herramientas", "◆", "Medio", "Pack+Datapack", "Simple", "Geoda", "Pico delicado para coleccionistas de cristales.", "Los cúmulos de amatista dan más fragmentos, pero el pico es frágil.", "Amatista, cobre y pico de hierro.", "No afecta minerales valiosos."),
  I("Pico del Topo", "Herramientas", "▰", "Inicio", "Plugin Paper", "Simple", "Cuevas", "Pico cómodo para túneles estrechos.", "Al minar piedra coloca una antorcha del inventario si la luz es baja.", "Contrato de minero inicial.", "Solo una antorcha cada 8 s."),
  I("Pala de Turba", "Herramientas", "♠", "Inicio", "Datapack", "Simple", "Pantano", "Pala húmeda para terrenos blandos.", "Rompe arena, grava, barro y tierra más rápido bajo lluvia.", "Bruja amistosa o cofre de pantano.", "Sin ventaja en combate."),
  I("Pala del Jardinero", "Herramientas", "♠", "Inicio", "Plugin Paper", "Simple", "Aldea", "Pala de paisajismo que evita tareas repetitivas.", "Uso secundario convierte un área 3×3 entre tierra, camino o barro.", "Comercio de aldeano agricultor experto.", "Consume 9 de durabilidad y exige materiales."),
  I("Hacha del Leñador", "Herramientas", "◆", "Inicio", "Plugin Paper", "Media", "Bosque", "Hacha para talar sin destruir medio bosque.", "Corta hasta 7 troncos verticales si todos pertenecen al mismo árbol.", "Desafío de replantar 64 árboles.", "Gasta durabilidad por bloque y no funciona en construcciones protegidas."),
  I("Hacha de Resina", "Herramientas", "◆", "Medio", "Datapack", "Simple", "Pale Garden", "Hacha pegajosa que aprovecha árboles pálidos.", "Tiene una pequeña probabilidad de no gastar durabilidad al cortar madera.", "Resina, madera pálida y diamante.", "El ahorro no supera 20%."),
  I("Azada de Primavera", "Herramientas", "⌟", "Inicio", "Plugin Paper", "Simple", "Campos", "Azada que transforma el riego en una decisión rápida.", "Uso secundario hidrata temporalmente cultivos cercanos consumiendo una botella.", "Recompensa de agricultor.", "Radio 4; no acelera crecimiento."),
  I("Caña del Abisal", "Herramientas", "〰", "Endgame", "Plugin Paper", "Media", "Océano profundo", "Caña para tesoros de gran profundidad.", "Pescar bajo Y=35 añade una tabla de objetos abisales cosméticos.", "Corazón del mar, hilo y prismarina oscura.", "Tesoros con límite diario por jugador."),
  I("Cizallas del Apicultor", "Herramientas", "✂", "Inicio", "Datapack", "Simple", "Pradera", "Cizallas que trabajan sin enfurecer abejas.", "Cosechar colmenas llenas aplica humo automáticamente si llevas carbón.", "Regalo por criar diez abejas.", "Consume un carbón por uso."),
  I("Brújula del Minero", "Herramientas", "◈", "Medio", "Plugin Paper", "Alta", "Subsuelo", "Detector aproximado que mantiene la exploración.", "Marca la dirección de una zona rica, nunca el bloque exacto.", "Redstone, brújula y fragmento de geoda.", "Lectura cada 60 s; resultado generado por región."),

  // Armaduras (10)
  I("Set del Guardián Silente", "Armaduras", "⬟", "Endgame", "Plugin Paper", "Alta", "Deep Dark", "Armadura oscura que convierte cautela en defensa.", "Con el set completo, agacharse reduce vibraciones y carga resistencia breve.", "Cuatro planos ocultos en ciudades antiguas.", "Protección similar a diamante; no vuelve invisible al Warden."),
  I("Botas de Brisa", "Armaduras", "⌄", "Medio", "Plugin Paper", "Media", "Trial Chambers", "Botas ágiles impulsadas por Breeze.", "Doble toque al saltar genera un pequeño salto de viento.", "Varas de brisa + botas de diamante.", "Tres cargas que regresan tocando suelo; sin vuelo."),
  I("Casco del Cartógrafo", "Armaduras", "⌂", "Inicio", "Plugin Paper", "Simple", "Overworld", "Casco para expediciones largas.", "Muestra puntos cardinales y bioma en ActionBar.", "Mapa lleno, brújula y casco de hierro.", "No muestra coordenadas ni jugadores."),
  I("Coraza de Caparazón", "Armaduras", "⬢", "Medio", "Datapack", "Simple", "Océano", "Peto robusto hecho para buzos.", "Bajo el agua da resistencia al retroceso; en tierra ralentiza un poco.", "Escudos de armadillo y prismarina.", "Protección de hierro; desventaja visible en tierra."),
  I("Grebas de Magma", "Armaduras", "▥", "Medio", "Plugin Paper", "Media", "Nether", "Pantalones que almacenan calor ambiental.", "En lava acumulan tres cargas que reducen el próximo daño de fuego.", "Crema de magma, netherita y plantilla de bastión.", "No da inmunidad; cada carga evita solo una parte."),
  I("Botas del Micelio", "Armaduras", "♣", "Inicio", "Datapack", "Simple", "Pantano", "Botas para terrenos húmedos y orgánicos.", "Velocidad ligera sobre micelio, podzol, barro y musgo.", "Cuero, hongos y bloque de musgo.", "Sin bono en piedra o PvP."),
  I("Manto del Fantasma", "Armaduras", "◒", "Medio", "Plugin Paper", "Media", "Cielo nocturno", "Élitros reforzados con membranas de Phantom.", "Planear de noche consume menos durabilidad y deja una estela.", "Élitros, membranas y reparación ceremonial.", "No aumenta velocidad y no funciona de día."),
  I("Set de Cobre Oxidado", "Armaduras", "⬡", "Inicio", "Plugin Paper", "Media", "Minas", "Armadura que cambia con el tiempo y cuenta la historia del dueño.", "Cada fase de oxidación intercambia defensa por resistencia al rayo.", "Lingotes de cobre y cera para fijar la fase.", "Nunca supera hierro; atractivo principalmente cosmético."),
  I("Yelmo del Piglin Diplomático", "Armaduras", "♛", "Medio", "Datapack", "Simple", "Nether", "Corona improvisada para negociar en bastiones.", "Piglins aceptan al jugador como si vistiera oro y truecan un poco más rápido.", "Oro, hocico y estandarte de bastión.", "Protección baja y no calma brutos."),
  I("Armadura de Cristal Resonante", "Armaduras", "◇", "Endgame", "Plugin Paper", "Alta", "Geodas", "Set frágil que responde al daño con sonido.", "Cada pieza perdida de durabilidad carga una campanada que empuja al atacante.", "Cristales perfectos obtenidos sin explosiones.", "Protección baja; pulso con 10 s de enfriamiento."),

  // Deep Dark y Warden (10)
  I("Corazón de Resonancia", "Deep Dark", "◉", "Endgame", "Plugin Paper", "Alta", "Ciudad antigua", "Reliquia central para recetas del Deep Dark.", "Absorbe una vibración cercana y enciende runas durante 20 s.", "Evento: saquear tres cofres sin invocar al Warden.", "Material de fabricación, no arma; una activación por minuto."),
  I("Frasco de Oscuridad", "Deep Dark", "◐", "Medio", "Datapack", "Simple", "Deep Dark", "Botella que conserva la oscuridad del Warden.", "Al romperse crea oscuridad breve y apaga velas cercanas.", "Botella + catalizador después de una muerte de mob.", "Uso táctico visual; 5 s, radio pequeño."),
  I("Sensor Domesticado", "Deep Dark", "⌁", "Medio", "Plugin Paper", "Media", "Deep Dark", "Sensor portátil para alarmas y puertas secretas.", "Puede vincularse a un jugador y emitir redstone ante pasos ajenos.", "Sensor calibrado + amatista + etiqueta.", "Una vinculación; alcance 8 bloques."),
  I("Tótem del Último Sonido", "Deep Dark", "♜", "Endgame", "Plugin Paper", "Alta", "Ciudad antigua", "Tótem que salva dejando una consecuencia inquietante.", "Evita la muerte, teletransporta al último lugar silencioso y aplica oscuridad.", "Cofre raro tras superar un desafío sin lana.", "Se consume; no funciona en el vacío."),
  I("Disco de los Ecos", "Deep Dark", "◍", "Medio", "Pack+Datapack", "Simple", "Ciudad antigua", "Coleccionable musical reconstruido por exploración.", "Tocar la pista revela partículas en puertas secretas cercanas.", "Combinar nueve fragmentos distintos.", "Solo pistas visuales; radio 12."),
  I("Linterna de Alma Sorda", "Deep Dark", "▣", "Inicio", "Datapack", "Simple", "Deep Dark", "Luz tenue que no pretende conquistar la oscuridad.", "Ilumina poco pero sirve como marcador de ruta con color único.", "Linterna de alma + lana + amatista.", "Sin ventaja directa sobre antorchas."),
  I("Botas de Lana Antigua", "Deep Dark", "⌄", "Medio", "Plugin Paper", "Simple", "Ciudad antigua", "Botas acolchadas para infiltración.", "Reducen la intensidad de vibración al caminar, no al correr o saltar.", "Lana, fragmentos de eco y botas de cuero.", "Protección de cuero; falla al recibir daño."),
  I("Báculo del Chillido", "Deep Dark", "ϟ", "Endgame", "Plugin Paper", "Alta", "Deep Dark", "Artefacto peligroso que imita un chillador.", "Marca un área; los enemigos dentro reciben oscuridad y una señal sonora.", "Cuatro catalizadores + plano de ciudad antigua.", "No invoca Wardens; 30 s de enfriamiento."),
  I("Brújula del Silencio", "Deep Dark", "◈", "Medio", "Plugin Paper", "Media", "Ciudad antigua", "Brújula que apunta hacia zonas sin vibraciones recientes.", "Ayuda a elegir rutas seguras durante 15 s.", "Eco, brújula de recuperación y lana.", "No detecta al Warden ni cofres."),
  I("Trofeo del Warden", "Deep Dark", "♚", "Endgame", "Plugin Paper", "Alta", "Deep Dark", "Recompensa ceremonial, no incentivo para farmear al Warden.", "Cabeza decorativa que reproduce un latido al acercarse alguien.", "Logro único por sobrevivir 90 s cerca de un Warden y escapar.", "No se obtiene matándolo; una vez por jugador."),

  // Comidas (10)
  I("Estofado del Minero", "Comidas", "♨", "Inicio", "Datapack", "Simple", "Minas", "Comida barata preparada para expediciones subterráneas.", "Sacia bien y da 20 s de prisa solo contra piedra común.", "Patata, hongo, carbón vegetal y cuenco.", "Prisa I; no afecta minerales."),
  I("Tarta de Chorus", "Comidas", "◫", "Endgame", "Plugin Paper", "Media", "End", "Postre inestable para escapadas divertidas.", "Cada porción teletransporta 1–3 bloques a un lugar seguro.", "Chorus, azúcar, huevo y leche.", "Nunca atraviesa paredes ni zonas protegidas."),
  I("Brocheta del Nether", "Comidas", "♨", "Medio", "Datapack", "Simple", "Nether", "Comida picante hecha con ingredientes de fortaleza.", "Da resistencia al fuego durante 8 s, seguida de hambre breve.", "Cerdo cocido, hongo carmesí y crema de magma.", "No reemplaza pociones para lava larga."),
  I("Sopa de Esporas", "Comidas", "♣", "Inicio", "Datapack", "Simple", "Pantano", "Receta de bruja con resultado distinto según el hongo.", "Elimina veneno y aplica lentitud 4 s.", "Dos hongos, miel y cuenco.", "Una cura con costo; no quita otros efectos."),
  I("Galleta de Amatista", "Comidas", "◇", "Inicio", "Datapack", "Simple", "Geoda", "Galleta crujiente para constructores y músicos.", "Durante 30 s, colocar bloques produce notas suaves y partículas.", "Trigo, azúcar y fragmento de amatista.", "Efecto puramente cosmético."),
  I("Ración del Cartógrafo", "Comidas", "▤", "Inicio", "Datapack", "Simple", "Aldea", "Paquete compacto para caminatas largas.", "Restaura poca hambre pero concede saturación solo mientras se camina.", "Pan, bayas y papel encerado.", "No funciona quieto ni en combate."),
  I("Manzana de Cobre", "Comidas", "●", "Medio", "Plugin Paper", "Media", "Trial Chambers", "Fruta metálica para tormentas y mecanismos.", "Atrae un rayo visual sin daño y carga bloques de cobre cercanos.", "Manzana, cobre y pararrayos usado.", "No crea rayos reales ni daño gratis."),
  I("Helado de Nieve Azul", "Comidas", "❄", "Inicio", "Datapack", "Simple", "Montaña", "Postre frío para atravesar biomas cálidos.", "Apaga fuego y reduce ligeramente el daño de magma durante 15 s.", "Nieve, leche, bayas y hielo azul.", "No protege de lava."),
  I("Banquete del Héroe", "Comidas", "♛", "Endgame", "Plugin Paper", "Alta", "Aldea", "Plato cooperativo posterior a una incursión.", "Al compartirlo, el grupo obtiene regeneración fuera de combate.", "Ingredientes entregados por aldeanos salvados.", "Se cancela al atacar; límite diario."),
  I("Té de Flor de Esporas", "Comidas", "✿", "Medio", "Datapack", "Simple", "Lush Caves", "Infusión para descensos seguros.", "Reduce velocidad de caída durante 20 s sin permitir vuelo.", "Flor de esporas, miel y botella.", "Efecto más corto que Caída Lenta."),

  // Encantamientos (10)
  I("Resonancia", "Encantamientos", "⌁", "Endgame", "Plugin Paper", "Alta", "Deep Dark", "Encantamiento de arma basado en ritmo.", "Golpes espaciados correctamente acumulan daño; spam lo reinicia.", "Libro en cofre de ciudad antigua.", "Máximo tres cargas y no combina con Filo V."),
  I("Excavación Precisa", "Encantamientos", "◫", "Inicio", "Plugin Paper", "Media", "Minas", "Mejora de pico para construcción técnica.", "Agacharse permite minar más lento sin romper bloques adyacentes frágiles.", "Mesa de encantamientos nivel bajo.", "Comodidad, no producción extra."),
  I("Paso Musgoso", "Encantamientos", "♣", "Inicio", "Plugin Paper", "Simple", "Lush Caves", "Encantamiento de botas para cuevas vivas.", "Correr sobre musgo consume menos hambre.", "Libro de cofre en mina exuberante.", "No da velocidad ni se acumula."),
  I("Retorno", "Encantamientos", "↶", "Medio", "Plugin Paper", "Alta", "End", "Encantamiento para herramientas arrojables custom.", "El objeto vuelve al dueño si cae al suelo.", "Bibliotecario maestro tras visitar el End.", "No recupera objetos del vacío o lava."),
  I("Temple", "Encantamientos", "♨", "Medio", "Plugin Paper", "Media", "Nether", "Protección para herramientas expuestas al fuego.", "El objeto tarda más en quemarse y avisa antes de desaparecer.", "Trueque raro de Piglin.", "No lo hace invulnerable ni evita cactus."),
  I("Vendaval", "Encantamientos", "〽", "Medio", "Plugin Paper", "Media", "Trial Chambers", "Encantamiento de arco para controlar distancia.", "Impactar empuja también al arquero un bloque hacia atrás.", "Libro de bóveda ominosa.", "No funciona agachado; retroceso limitado."),
  I("Cosecha Gentil", "Encantamientos", "✿", "Inicio", "Plugin Paper", "Simple", "Aldea", "Encantamiento de azada centrado en replantar.", "Cosechar cultivo maduro replanta usando una semilla del drop.", "Comercio de agricultor experto.", "Sin multiplicar semillas ni experiencia."),
  I("Última Luz", "Encantamientos", "✦", "Endgame", "Plugin Paper", "Alta", "End", "Encantamiento defensivo para cascos.", "Bajo tres corazones ilumina enemigos cercanos durante 3 s.", "Biblioteca de End City.", "60 s de enfriamiento; solo brillo visual."),
  I("Anclaje", "Encantamientos", "⚓", "Medio", "Plugin Paper", "Media", "Océano", "Encantamiento de botas contra corrientes y empujones.", "Agacharse bajo agua aumenta resistencia al retroceso.", "Ruina oceánica fría.", "Reduce velocidad mientras está activo."),
  I("Eco de Fortuna", "Encantamientos", "◇", "Endgame", "Plugin Paper", "Alta", "Deep Dark", "Alternativa controlada a Fortuna.", "Cada diez minerales sin bonus garantiza un pequeño extra.", "Libro de ciudad antigua + sacrificio de Fortuna.", "No combina con Fortuna; contador por herramienta."),

  // Magia y reliquias (10)
  I("Reloj de la Luna", "Reliquias", "◔", "Inicio", "Plugin Paper", "Simple", "Overworld", "Reloj que ayuda a preparar aventuras nocturnas.", "Muestra tiempo hasta la noche y fase lunar en ActionBar.", "Reloj, amatista y membrana.", "Información útil, sin cambiar el tiempo."),
  I("Espejo de Regreso", "Reliquias", "▣", "Endgame", "Plugin Paper", "Alta", "End", "Espejo de emergencia vinculado a un punto.", "Canalizar 5 s regresa a un ancla colocada.", "Vidrio teñido, estrella del Nether y perla.", "Una carga cara; se cancela con daño."),
  I("Campana del Hogar", "Reliquias", "♢", "Medio", "Plugin Paper", "Media", "Aldea", "Campana pequeña para reunir grupos.", "Aliados que la hayan sintonizado ven una dirección durante 10 s.", "Campana de aldea + nombres del grupo.", "No revela coordenadas ni enemigos."),
  I("Ídolo de la Lluvia", "Reliquias", "☂", "Medio", "Plugin Paper", "Alta", "Jungla", "Tótem ritual que altera un área, no el mundo completo.", "Crea lluvia visual local y acelera calderos durante 2 min.", "Templo de jungla + tridente dañado.", "30 min de enfriamiento por región."),
  I("Prisma de Bioma", "Reliquias", "◆", "Endgame", "Plugin Paper", "Alta", "Exploración", "Colección de colores obtenida visitando biomas.", "Proyecta un holograma del próximo bioma de una ruta elegida.", "Completar diez muestras ambientales.", "No da coordenadas; solo dirección aproximada."),
  I("Farol de los Perdidos", "Reliquias", "✧", "Inicio", "Plugin Paper", "Simple", "Bosque", "Linterna que recuerda el camino recorrido.", "Deja una partícula cada 12 bloques que solo ve el dueño.", "Linterna, brújula y baya luminosa.", "Máximo 30 marcas; desaparecen al salir."),
  I("Moneda del Piglin", "Reliquias", "●", "Medio", "Datapack", "Simple", "Nether", "Ficha ceremonial para trueques especiales.", "Un Piglin nombrado acepta la moneda por un cosmético rotativo.", "Completar un desafío de bastión.", "Sin ventaja económica infinita; un uso."),
  I("Urna de Experiencia", "Reliquias", "▣", "Medio", "Plugin Paper", "Media", "Overworld", "Banco físico y riesgoso de experiencia.", "Guarda hasta 10 niveles y los devuelve al romperla el dueño.", "Arcilla, lapislázuli y botella de experiencia.", "No mueve niveles altos de forma eficiente."),
  I("Pluma del Cronista", "Reliquias", "✎", "Inicio", "Plugin Paper", "Simple", "Biblioteca", "Objeto social para escribir historia del servidor.", "Firmar un libro añade fecha, bioma y nombre del autor.", "Regalo de bibliotecario.", "Solo metadatos; no da poder."),
  I("Orbe de Repetición", "Reliquias", "◉", "Endgame", "Plugin Paper", "Alta", "Trial Chambers", "Reliquia que repite una acción simple.", "Repite la última campana, puerta o palanca usada tras 3 s.", "Bóveda ominosa + redstone comprimida.", "Lista blanca de bloques y 20 s de enfriamiento."),

  // Arcos y distancia (8)
  I("Arco de Raíces", "Arcos", "➶", "Inicio", "Plugin Paper", "Media", "Lush Caves", "Arco vivo que controla rutas.", "Una flecha completamente cargada crea raíces que ralentizan 2 s.", "Raíces colgantes, arco y baya luminosa.", "Daño base reducido; no inmoviliza."),
  I("Ballesta del Artificiero", "Arcos", "➷", "Medio", "Plugin Paper", "Alta", "Trial Chambers", "Ballesta para munición utilitaria.", "Alterna flecha luminosa, de humo visual o normal.", "Plano de bóveda + cobre + ballesta.", "Munición fabricable y efectos sin daño extra."),
  I("Arco de la Aurora", "Arcos", "➶", "Endgame", "Pack+Datapack", "Media", "End", "Arco cosmético de colección celestial.", "Las flechas dejan un rastro de color según la dimensión.", "Desafío de disparo en tres dimensiones.", "Mismo daño que un arco normal."),
  I("Honda de Slime", "Arcos", "◌", "Inicio", "Plugin Paper", "Simple", "Pantano", "Arma juguetona para empujar, no matar.", "Lanza bolas que hacen poco daño y mucho retroceso.", "Slime, cuero y cuerda.", "Cadencia baja; inútil contra jefes."),
  I("Tridente de Marea", "Arcos", "Ψ", "Medio", "Plugin Paper", "Media", "Océano", "Tridente que convierte el agua en movilidad lateral.", "Uso secundario bajo agua impulsa horizontalmente.", "Tridente + corazón del mar.", "Consume mucha durabilidad; no funciona en lluvia."),
  I("Lanza de Ender", "Arcos", "↟", "Endgame", "Plugin Paper", "Alta", "End", "Proyectil recuperable para cazadores del vacío.", "Al impactar un bloque crea un punto de regreso de 5 s.", "Vara de End + perlas + plantilla rara.", "Volver cuesta una perla y se cancela con daño."),
  I("Búmeran de Cobre", "Arcos", "⌁", "Inicio", "Plugin Paper", "Media", "Minas", "Proyectil sencillo con ruta de ida y vuelta.", "Golpea una vez y regresa; puede recoger un objeto del suelo.", "Cobre, cuerda y redstone.", "Un objetivo, daño bajo, no atraviesa bloques."),
  I("Cerbatana de la Jungla", "Arcos", "→", "Medio", "Plugin Paper", "Media", "Jungla", "Arma discreta de corto alcance.", "Acepta dardos de lentitud o brillo fabricados con plantas.", "Bambú, pluma y plano de templo.", "Efectos cortos; casi sin daño directo."),

  // Exploración y utilidad (8)
  I("Mochila del Espeleólogo", "Utilidad", "▤", "Inicio", "Plugin Paper", "Alta", "Cuevas", "Inventario pequeño dedicado a bloques de minería.", "Guarda 9 espacios solo de piedra, minerales y antorchas.", "Cuero, cofre y cuerda tras un contrato.", "Una por jugador; no acepta Shulkers."),
  I("Tiza del Explorador", "Utilidad", "✕", "Inicio", "Plugin Paper", "Simple", "Cualquier lugar", "Marcador temporal para cuevas y ruinas.", "Coloca una flecha luminosa en una cara del bloque durante 20 min.", "Calcita + tinte.", "Máximo 20 marcas por jugador."),
  I("Tienda Plegable", "Utilidad", "⌂", "Medio", "Plugin Paper", "Alta", "Overworld", "Campamento breve para expediciones grupales.", "Crea un punto con cama visual, fogata y almacenamiento temporal.", "Lana, cuero, fogata y cofre.", "No cambia spawn; desaparece al vaciarse."),
  I("Catalejo del Cazador", "Utilidad", "◎", "Inicio", "Plugin Paper", "Media", "Overworld", "Catalejo que reconoce fauna sin convertirla en radar.", "Mirar un mob 2 s muestra nombre, salud y hábitat.", "Catalejo + libro.", "No funciona a través de bloques ni con jugadores."),
  I("Mapa de Corrientes", "Utilidad", "▧", "Medio", "Plugin Paper", "Alta", "Océano", "Mapa marítimo que sugiere rutas seguras.", "Marca ruinas ya visitadas y corrientes decorativas.", "Cartógrafo + fragmentos de tres ruinas.", "No marca monumentos nuevos automáticamente."),
  I("Ancla de Escalada", "Utilidad", "⚓", "Inicio", "Plugin Paper", "Media", "Montaña", "Cuerda reusable para ascensos controlados.", "Se fija a una pared y crea una cadena temporal de 12 bloques.", "Cadenas, cuerda y gancho de hierro.", "Una activa por jugador; zonas protegidas bloqueadas."),
  I("Silbato del Compañero", "Utilidad", "♪", "Inicio", "Plugin Paper", "Media", "Overworld", "Objeto para mascotas extraviadas.", "Llama al lobo, gato o loro vinculado si está cargado y cerca.", "Cobre + etiqueta de la mascota.", "Radio 64; no teletransporta entre dimensiones."),
  I("Caja de Reparación", "Utilidad", "▣", "Medio", "Plugin Paper", "Media", "Aldea", "Estación portátil con costo claro.", "Repara una pequeña cantidad usando el material correcto.", "Yunque dañado, cuero y hierro.", "Cinco usos, sin experiencia, no repara netherita gratis."),

  // Eventos y jefes (6)
  I("Corona del Heraldo", "Eventos", "♛", "Endgame", "Plugin Paper", "Alta", "Incursión", "Trofeo de un capitán de incursión mejorado.", "Alzarla inicia un desafío de oleadas opcional en una arena.", "Drop único del Heraldo Illager.", "Sin bonus pasivo; requiere consentimiento del grupo."),
  I("Núcleo de Tormenta", "Eventos", "ϟ", "Endgame", "Plugin Paper", "Alta", "Montaña", "Corazón de un miniboss nacido durante tormentas.", "Material para Botas de Brisa y armas eléctricas.", "Evento raro en picos durante una tormenta.", "Drop garantizado una vez por evento; no objeto de daño."),
  I("Máscara del Alquimista", "Eventos", "◒", "Medio", "Plugin Paper", "Alta", "Pantano", "Máscara del miniboss Bruja Alquimista.", "Muestra el tipo del efecto positivo activo con menor duración.", "Contrato de pantano y combate con mecánicas de pociones.", "Información únicamente; protección de cuero."),
  I("Escama del Leviatán", "Eventos", "◈", "Endgame", "Plugin Paper", "Alta", "Océano", "Material cooperativo de un guardián marino especial.", "Permite fabricar equipo de marea y bloques decorativos.", "Evento en monumento restaurado.", "Recompensa por participación, límite semanal."),
  I("Semilla del Bosque Pálido", "Eventos", "✿", "Medio", "Plugin Paper", "Media", "Pale Garden", "Trofeo obtenido protegiendo un jardín nocturno.", "Planta un árbol decorativo único en una zona autorizada.", "Sobrevivir al evento del Creaking sin destruir corazones.", "Cosmético; un árbol por parcela."),
  I("Fragmento del Dragón", "Eventos", "◆", "Endgame", "Plugin Paper", "Alta", "End", "Recompensa de desafíos posteriores al dragón.", "Moneda de fabricación para variantes laterales de End.", "Cristales protegidos, parkour o defensa de portal.", "No exige matar al dragón repetidamente."),
];

const categoryMeta = {
  "Armas": { icon: "⚔", color: "#964a37" },
  "Herramientas": { icon: "⛏", color: "#356b59" },
  "Armaduras": { icon: "⬟", color: "#586d7c" },
  "Deep Dark": { icon: "◉", color: "#28566a" },
  "Comidas": { icon: "♨", color: "#a56835" },
  "Encantamientos": { icon: "⌁", color: "#66528b" },
  "Reliquias": { icon: "✦", color: "#745b3e" },
  "Arcos": { icon: "➶", color: "#55723f" },
  "Utilidad": { icon: "▤", color: "#3d6a6f" },
  "Eventos": { icon: "♛", color: "#763e51" },
};

const stageOrder = { "Inicio": 1, "Medio": 2, "Endgame": 3 };
const difficultyOrder = { "Simple": 1, "Media": 2, "Alta": 3 };
const state = {
  categories: new Set(),
  stages: new Set(),
  methods: new Set(),
  difficulty: "",
  search: "",
  sort: "recommended",
  shown: 12,
  savedOnly: false,
};

let saved = new Set(JSON.parse(localStorage.getItem("arsenal-saved") || "[]"));

const $ = (selector) => document.querySelector(selector);
const cardGrid = $("#cardGrid");
const resultCount = $("#resultCount");
const activeFilters = $("#activeFilters");

function countsFor(key) {
  return ideas.reduce((acc, item) => {
    acc[item[key]] = (acc[item[key]] || 0) + 1;
    return acc;
  }, {});
}

function createChecks(container, key, values) {
  const counts = countsFor(key);
  container.innerHTML = values.map(value => `
    <label class="filter-check">
      <input type="checkbox" value="${value}" data-filter="${key}">
      <span>${value}</span><small>${String(counts[value]).padStart(2, "0")}</small>
    </label>
  `).join("");
}

createChecks($("#categoryFilters"), "category", Object.keys(categoryMeta));
createChecks($("#stageFilters"), "stage", ["Inicio", "Medio", "Endgame"]);
createChecks($("#methodFilters"), "method", ["Datapack", "Pack+Datapack", "Plugin Paper", "Mod"]);
$("#difficultyFilters").innerHTML = ["Simple", "Media", "Alta"]
  .map(value => `<button type="button" data-difficulty="${value}">${value}</button>`).join("");

function getFiltered() {
  const query = state.search.trim().toLocaleLowerCase("es");
  const filtered = ideas.filter(item => {
    const searchable = `${item.name} ${item.category} ${item.biome} ${item.desc} ${item.effect}`.toLocaleLowerCase("es");
    return (!query || searchable.includes(query))
      && (!state.categories.size || state.categories.has(item.category))
      && (!state.stages.size || state.stages.has(item.stage))
      && (!state.methods.size || state.methods.has(item.method))
      && (!state.difficulty || item.difficulty === state.difficulty)
      && (!state.savedOnly || saved.has(item.name));
  });

  if (state.sort === "name") filtered.sort((a, b) => a.name.localeCompare(b.name, "es"));
  if (state.sort === "difficulty") filtered.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
  if (state.sort === "stage") filtered.sort((a, b) => stageOrder[a.stage] - stageOrder[b.stage]);
  return filtered;
}

function cardTemplate(item) {
  const meta = categoryMeta[item.category];
  return `
    <article class="idea-card" style="--card-accent:${meta.color}">
      <div class="card-top">
        <span class="item-icon" aria-hidden="true">${item.icon || meta.icon}</span>
        <button class="save-card ${saved.has(item.name) ? "active" : ""}" type="button"
          data-save="${item.name}" aria-label="${saved.has(item.name) ? "Quitar de" : "Añadir a"} guardados">✦</button>
      </div>
      <p class="card-category">${item.category.toUpperCase()} · ${item.biome.toUpperCase()}</p>
      <h3>${item.name}</h3>
      <p class="card-desc">${item.desc}</p>
      <div class="card-bottom">
        <p class="card-effect"><strong>EFECTO</strong><br>${item.effect}</p>
        <div class="card-tags"><span>${item.method}</span><span>${item.difficulty}</span><span>${item.stage}</span></div>
      </div>
      <button class="open-card" type="button" data-open="${item.name}">Ver detalle de ${item.name}</button>
    </article>
  `;
}

function render() {
  const filtered = getFiltered();
  const visible = filtered.slice(0, state.shown);
  cardGrid.innerHTML = visible.map(cardTemplate).join("");
  resultCount.textContent = filtered.length;
  $("#ideaTotal").textContent = ideas.length;
  $("#loadMore").hidden = filtered.length <= state.shown;
  $("#emptyState").hidden = filtered.length > 0;
  $("#savedCount").textContent = saved.size;
  renderActiveFilters();
}

function renderActiveFilters() {
  const tags = [
    ...[...state.categories].map(v => ({ type: "category", value: v })),
    ...[...state.stages].map(v => ({ type: "stage", value: v })),
    ...[...state.methods].map(v => ({ type: "method", value: v })),
    ...(state.difficulty ? [{ type: "difficulty", value: state.difficulty }] : []),
    ...(state.savedOnly ? [{ type: "saved", value: "Solo guardados" }] : []),
  ];
  activeFilters.innerHTML = tags
    .map(tag => `<button type="button" data-remove="${tag.type}" data-value="${tag.value}">${tag.value} ×</button>`)
    .join("");
}

function clearFilters() {
  state.categories.clear();
  state.stages.clear();
  state.methods.clear();
  state.difficulty = "";
  state.search = "";
  state.savedOnly = false;
  state.shown = 12;
  $("#searchInput").value = "";
  document.querySelectorAll("[data-filter]").forEach(input => { input.checked = false; });
  document.querySelectorAll("[data-difficulty]").forEach(button => button.classList.remove("active"));
  render();
}

document.addEventListener("change", event => {
  const filter = event.target.dataset.filter;
  if (!filter) return;
  const set = state[`${filter === "category" ? "categories" : filter === "stage" ? "stages" : "methods"}`];
  event.target.checked ? set.add(event.target.value) : set.delete(event.target.value);
  state.shown = 12;
  render();
});

$("#searchInput").addEventListener("input", event => {
  state.search = event.target.value;
  state.shown = 12;
  render();
});

$("#sortSelect").addEventListener("change", event => {
  state.sort = event.target.value;
  render();
});

$("#difficultyFilters").addEventListener("click", event => {
  const value = event.target.dataset.difficulty;
  if (!value) return;
  state.difficulty = state.difficulty === value ? "" : value;
  document.querySelectorAll("[data-difficulty]").forEach(button => {
    button.classList.toggle("active", button.dataset.difficulty === state.difficulty);
  });
  state.shown = 12;
  render();
});

$("#loadMore").addEventListener("click", () => {
  state.shown += 12;
  render();
});

$("#clearFilters").addEventListener("click", clearFilters);
$("#emptyClear").addEventListener("click", clearFilters);

cardGrid.addEventListener("click", event => {
  const saveName = event.target.dataset.save;
  const openName = event.target.dataset.open;
  if (saveName) {
    saved.has(saveName) ? saved.delete(saveName) : saved.add(saveName);
    localStorage.setItem("arsenal-saved", JSON.stringify([...saved]));
    render();
  }
  if (openName) openModal(ideas.find(item => item.name === openName));
});

activeFilters.addEventListener("click", event => {
  const type = event.target.dataset.remove;
  const value = event.target.dataset.value;
  if (!type) return;
  if (type === "category") state.categories.delete(value);
  if (type === "stage") state.stages.delete(value);
  if (type === "method") state.methods.delete(value);
  if (type === "difficulty") state.difficulty = "";
  if (type === "saved") state.savedOnly = false;
  document.querySelectorAll(`[data-filter]`).forEach(input => {
    if (input.value === value) input.checked = false;
  });
  document.querySelectorAll("[data-difficulty]").forEach(button => {
    button.classList.toggle("active", button.dataset.difficulty === state.difficulty);
  });
  render();
});

$("#savedButton").addEventListener("click", () => {
  state.savedOnly = !state.savedOnly;
  state.shown = 96;
  $("#catalogo").scrollIntoView({ behavior: "smooth" });
  render();
});

$("#randomButton").addEventListener("click", () => {
  const item = ideas[Math.floor(Math.random() * ideas.length)];
  openModal(item);
});

function openModal(item) {
  const color = categoryMeta[item.category].color;
  const content = $("#modalContent");
  content.innerHTML = `
    <div class="modal-hero" style="--modal-accent:${color}">
      <span class="item-icon">${item.icon}</span>
      <div><span class="micro-label">${item.category.toUpperCase()} · ${item.biome.toUpperCase()}</span><h2>${item.name}</h2></div>
    </div>
    <div class="modal-body">
      <p class="modal-lead">${item.desc}</p>
      <div class="modal-detail-grid">
        <div><span>ETAPA</span><strong>${item.stage}</strong></div>
        <div><span>DIFICULTAD</span><strong>${item.difficulty}</strong></div>
        <div><span>IMPLEMENTACIÓN</span><strong>${item.method}</strong></div>
        <div><span>ORIGEN</span><strong>${item.biome}</strong></div>
      </div>
      <h3>¿QUÉ HACE?</h3><p>${item.effect}</p>
      <h3>OBTENCIÓN PROPUESTA</h3><p>${item.obtain}</p>
      <h3>REGLA DE BALANCE</h3><p>${item.balance}</p>
    </div>
  `;
  $("#ideaModal").showModal();
}

$("#modalClose").addEventListener("click", () => $("#ideaModal").close());
$("#ideaModal").addEventListener("click", event => {
  if (event.target === $("#ideaModal")) $("#ideaModal").close();
});

$("#exportButton").addEventListener("click", () => {
  const chosen = ideas.filter(item => saved.has(item.name));
  const text = chosen.length
    ? chosen.map((item, index) => `${index + 1}. ${item.name} [${item.category}]\n   ${item.desc}\n   Efecto: ${item.effect}\n   Técnica: ${item.method} · ${item.difficulty}\n`).join("\n")
    : "Todavía no guardaste ninguna idea en El Gran Arsenal.";
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "ideas_guardadas_minecraft.txt";
  link.click();
  URL.revokeObjectURL(link.href);
});

render();
