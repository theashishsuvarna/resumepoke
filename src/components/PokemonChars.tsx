import { motion } from 'framer-motion';
import { useState } from 'react';

type CharProps = {
  className?: string;
  follow?: { x: number; y: number };
};

const POKEAPI_ART = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

/**
 * Real Pokémon artwork from PokeAPI's official artwork CDN.
 * Uses transparent PNGs with high-quality official artwork.
 * Includes error fallback to a styled placeholder.
 */

function PokemonImage({
  id,
  name,
  className = '',
  alt,
}: {
  id: number;
  name: string;
  className?: string;
  alt: string;
}) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        aria-label={alt}
        role="img"
      >
        <span className="font-display font-extrabold text-2xl text-ink-900/30">{name}</span>
      </div>
    );
  }

  return (
    <img
      src={`${POKEAPI_ART}/${id}.png`}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setError(true)}
    />
  );
}

/* Pikachu — official artwork #25 */
export function PikachuChar({ className = '', follow }: CharProps) {
  const tx = follow ? Math.max(-4, Math.min(4, follow.x * 0.02)) : 0;
  const ty = follow ? Math.max(-3, Math.min(3, follow.y * 0.02)) : 0;
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <motion.div animate={{ x: tx, y: ty }} transition={{ type: 'spring', stiffness: 60, damping: 20 }}>
        <PokemonImage
          id={25}
          name="Pikachu"
          alt="Pikachu, the Electric-type Pokémon"
          className="w-full h-full object-contain drop-shadow-[4px_4px_0_rgba(10,10,10,0.15)]"
        />
      </motion.div>
    </motion.div>
  );
}

/* Eevee — official artwork #133 */
export function EeveeChar({ className = '', follow }: CharProps) {
  const tx = follow ? Math.max(-3, Math.min(3, follow.x * 0.02)) : 0;
  const ty = follow ? Math.max(-2, Math.min(2, follow.y * 0.02)) : 0;
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -6, 0], rotate: [-1, 1, -1] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <motion.div animate={{ x: tx, y: ty }} transition={{ type: 'spring', stiffness: 60, damping: 20 }}>
        <PokemonImage
          id={133}
          name="Eevee"
          alt="Eevee, the Normal-type Pokémon"
          className="w-full h-full object-contain drop-shadow-[6px_6px_0_rgba(10,10,10,0.15)]"
        />
      </motion.div>
    </motion.div>
  );
}

/* Charizard — official artwork #6 */
export function CharizardChar({ className = '' }: CharProps) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <PokemonImage
        id={6}
        name="Charizard"
        alt="Charizard, the Fire/Flying-type Pokémon"
        className="w-full h-full object-contain drop-shadow-[4px_4px_0_rgba(10,10,10,0.2)]"
      />
    </motion.div>
  );
}

/* Charmander — official artwork #4 */
export function CharmanderChar({ className = '' }: CharProps) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <PokemonImage
        id={4}
        name="Charmander"
        alt="Charmander, the Fire-type Pokémon"
        className="w-full h-full object-contain drop-shadow-[4px_4px_0_rgba(10,10,10,0.2)]"
      />
    </motion.div>
  );
}

/* Snorlax — official artwork #143 */
export function SnorlaxChar({ className = '' }: CharProps) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <PokemonImage
        id={143}
        name="Snorlax"
        alt="Snorlax, the Normal-type Pokémon"
        className="w-full h-full object-contain drop-shadow-[4px_4px_0_rgba(10,10,10,0.2)]"
      />
    </motion.div>
  );
}

/* Gengar — official artwork #94 */
export function GengarChar({ className = '' }: CharProps) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <PokemonImage
        id={94}
        name="Gengar"
        alt="Gengar, the Ghost/Poison-type Pokémon"
        className="w-full h-full object-contain drop-shadow-[4px_4px_0_rgba(10,10,10,0.2)]"
      />
    </motion.div>
  );
}

/* Lucario — official artwork #448 */
export function LucarioChar({ className = '' }: CharProps) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <PokemonImage
        id={448}
        name="Lucario"
        alt="Lucario, the Fighting/Steel-type Pokémon"
        className="w-full h-full object-contain drop-shadow-[4px_4px_0_rgba(10,10,10,0.2)]"
      />
    </motion.div>
  );
}

/* Greninja — official artwork #658 */
export function GreninjaChar({ className = '' }: CharProps) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <PokemonImage
        id={658}
        name="Greninja"
        alt="Greninja, the Water/Dark-type Pokémon"
        className="w-full h-full object-contain drop-shadow-[4px_4px_0_rgba(10,10,10,0.2)]"
      />
    </motion.div>
  );
}

/* Mewtwo — official artwork #150 */
export function MewtwoChar({ className = '' }: CharProps) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <PokemonImage
        id={150}
        name="Mewtwo"
        alt="Mewtwo, the Psychic-type Pokémon"
        className="w-full h-full object-contain drop-shadow-[4px_4px_0_rgba(10,10,10,0.2)]"
      />
    </motion.div>
  );
}

/* Gardevoir — official artwork #282 */
export function GardevoirChar({ className = '' }: CharProps) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -7, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <PokemonImage
        id={282}
        name="Gardevoir"
        alt="Gardevoir, the Psychic/Fairy-type Pokémon"
        className="w-full h-full object-contain drop-shadow-[4px_4px_0_rgba(10,10,10,0.2)]"
      />
    </motion.div>
  );
}

/* Bulbasaur — official artwork #1 */
export function BulbasaurChar({ className = '' }: CharProps) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <PokemonImage
        id={1}
        name="Bulbasaur"
        alt="Bulbasaur, the Grass/Poison-type Pokémon"
        className="w-full h-full object-contain drop-shadow-[4px_4px_0_rgba(10,10,10,0.2)]"
      />
    </motion.div>
  );
}

/* Squirtle — official artwork #7 */
export function SquirtleChar({ className = '' }: CharProps) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <PokemonImage
        id={7}
        name="Squirtle"
        alt="Squirtle, the Water-type Pokémon"
        className="w-full h-full object-contain drop-shadow-[4px_4px_0_rgba(10,10,10,0.2)]"
      />
    </motion.div>
  );
}

/* Psyduck — official artwork #54 */
export function PsyduckChar({ className = '' }: CharProps) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <PokemonImage
        id={54}
        name="Psyduck"
        alt="Psyduck, the Water-type Pokémon"
        className="w-full h-full object-contain drop-shadow-[4px_4px_0_rgba(10,10,10,0.2)]"
      />
    </motion.div>
  );
}

/* Ditto — official artwork #132 */
export function DittoChar({ className = '' }: CharProps) {
  return (
    <motion.div
      className={className}
      animate={{ scale: [1, 1.05, 1], y: [0, -4, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <PokemonImage
        id={132}
        name="Ditto"
        alt="Ditto, the Normal-type Pokémon"
        className="w-full h-full object-contain drop-shadow-[4px_4px_0_rgba(10,10,10,0.2)]"
      />
    </motion.div>
  );
}

/* Jigglypuff — official artwork #39 */
export function JigglypuffChar({ className = '' }: CharProps) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -6, 0], scale: [1, 1.03, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <PokemonImage
        id={39}
        name="Jigglypuff"
        alt="Jigglypuff, the Normal/Fairy-type Pokémon"
        className="w-full h-full object-contain drop-shadow-[4px_4px_0_rgba(10,10,10,0.2)]"
      />
    </motion.div>
  );
}

/* Rayquaza — official artwork #384 */
export function RayquazaChar({ className = '' }: CharProps) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -12, 0], rotate: [-1, 1, -1] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <PokemonImage
        id={384}
        name="Rayquaza"
        alt="Rayquaza, the Dragon/Flying-type Pokémon"
        className="w-full h-full object-contain drop-shadow-[4px_4px_0_rgba(10,10,10,0.2)]"
      />
    </motion.div>
  );
}

/* Small flying Pokémon silhouette — kept as SVG for background decoration */
export function FlyingSilhouette({ className = '' }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 60 40"
      className={className}
      animate={{ y: [0, -15, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path
        d="M5 20 Q15 5 25 18 Q30 10 35 18 Q45 5 55 20 Q45 25 35 22 Q30 28 25 22 Q15 25 5 20 Z"
        fill="#0a0a0a"
        opacity="0.15"
      />
    </motion.svg>
  );
}
