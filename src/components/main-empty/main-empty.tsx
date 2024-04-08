type MainEmptyProps = {
  currentCity: string;
}

export default function MainEmpty({ currentCity }: MainEmptyProps) {
  return (
    <section className="cities__no-places" data-testid={'main-empty'}>
      <div className="cities__status-wrapper tabs__content">
        <b className="cities__status">No places to stay available</b>
        <p className="cities__status-description" data-testid={'main-empty-text'}>We could not find any property available at the moment in {currentCity}</p>
      </div>
    </section>
  );
}
