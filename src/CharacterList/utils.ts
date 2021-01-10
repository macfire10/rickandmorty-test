/** Filter's out rick based by Name */
export const matchRick = (name?: string | null) => {
  if (!name) return false;

  const lowerCasedName = name.toLowerCase();

  const hasRickInName = !!lowerCasedName.match('rick');

  return hasRickInName;
}

/** Filter's out rick based by Name. Filters out character's like Morty's lawyer etc */
export const matchMorty = (name?: string | null) => {
  if (!name) return false;

  const lowerCasedName = name.toLowerCase();

  const hasRickInName = !!lowerCasedName.match('morty');
  const notRicksSubject = !lowerCasedName.match(`morty’s`);

  return hasRickInName && notRicksSubject;
}