# North Star: Milonga Simulator

## 1. Vision

The Milonga Simulator is a Monte Carlo simulation tool designed to model the social and dancing dynamics of a tango night (Milonga). By simulating complex interactions between dancers with varying attributes and preferences, we aim to understand how different distributions of skill, role balance, and social biases affect the overall "danceability" and satisfaction of the participants.

### Core Objectives

- **Understand Dynamics**: Reveal how role imbalances, skill distributions, and social biases impact dancing opportunities.
- **Optimize Events**: Help organizers predict outcomes and design better milongas.
- **Educational Tool**: Demonstrate the importance of inclusive attitudes and balanced demographics.
- **Data-Driven Insights**: Quantify the impact of factors like snobism, sexism, and skill level on overall satisfaction.
- **Scenario Planning**: Allow "what-if" analysis for different event configurations.

## 2. Core Entities

### Dancers

Each agent in the simulation represents a dancer with the following attributes:

- **Role**: Leader, Follower, or Double-Role.
- **Gender**: Male/Female (or custom), defined per role.
- **Dance Level**: Modeled via a distribution (Gaussian/skewed) defined by average, skew, spread, min, and max.
- **Stamina**: Numeric value (0-100) that decays with each tanda danced and recovers during rest. When stamina falls below a threshold, dancers become unavailable.
- **Personal Attributes**:
  - **Age**: Numeric value used in ageism calculations.
  - **Sexiness**: Abstract attraction score (0-10) representing charisma/appeal.
  - **Sociability**: Affects willingness to dance with strangers vs. friends.
- **Psychological Factors (Biases)**:
  - **Snobism**: Resistance to dancing with lower-level partners (preventing dancing "downwards"). Preference for higher level over same level.
  - **Sexism**: Bias for/against specific gender presentations or roles.
  - **Ageism**: Preference for specific age groups.
  - **Friendship**: Higher probability of dancing with known "friends" (pre-seeded connection matrix).

### Initialization

- Dancers are generated based on distribution parameters.
- A **Friendship Matrix** is pre-seeded with random connections (e.g., 10-20% of possible pairs know each other).
- Each dancer's attributes are sampled from configured distributions.

### The Event (The Milonga)

- **Duration**: Defined by a number of **Tandas** (sets of music), typically ~20 per night.
- **Music**: Each tanda has a genre/style (Tango, Vals, Milonga, Nuevo) which matches against dancer preferences. Some dancers may skip tandas due to music taste.
- **Cortinas**: Breaks between tandas (typically 30-60 seconds) where partner selection logic resets and dancers return to their seats.

## 3. Simulation Mechanics

### Partner Selection (The Cabeceo Model)

For each Tanda, a matching algorithm executes:

1.  **Availability Check**: Dancers decide if they want to dance based on current stamina and music preference.
2.  **Scoring**: Available Dancers score potential partners based on:
    - **Repeated Partner Constraints**: Penalties/bans for dancing consecutive tandas or exceeding nightly limits with the same person.
    - **Level Compatibility**: General preference for similar levels, modified by Snobism (penalty for lower levels).
    - Attractiveness/Chemistry (weighted by Sexiness/Ageism).
    - Social Connection (Friendship bonus).
3.  **Matching**: Pairs are formed using a stable matching algorithm or probabilistic weighted selection based on mutual scores. Higher mutual scores increase pairing probability.
4.  **Dancing**: Matched pairs dance, consuming stamina (e.g., -15 per tanda) and incrementing their "connection strength". Unmatched dancers either:
    - **Sitting Out** (frustrated): Want to dance but couldn't find a partner.
    - **Resting** (voluntary): Chose not to dance to recover stamina (+10 per tanda).

### Scoring Algorithm Details

For each available dancer evaluating a potential partner:

```
Score = BaseCompatibility
      + LevelScore(partner_level, own_level, snobism_weight)
      + AttractivenessScore(partner_sexiness, ageism_weight)
      + FriendshipBonus(friendship_matrix[self][partner])
      - RepetitionPenalty(dance_history[self][partner])
      - ConsecutivePenalty(last_partner == partner)
```

Where:

- **LevelScore**: Gaussian around own level, with asymmetric penalty for lower levels (controlled by snobism).
- **AttractivenessScore**: Weighted by partner's sexiness and age compatibility.
- **FriendshipBonus**: Large bonus if pre-existing friendship exists.
- **RepetitionPenalty**: Increases with number of tandas already danced together.
- **ConsecutivePenalty**: Strong penalty/ban if would dance consecutive tandas.

### Monte Carlo Approach

- The night is simulated thousands of times to smooth out randomness.
- Results are aggregated to show probability distributions of outcomes rather than single anecdotal nights.

## 4. Key Metrics & Output

We measure the health and dynamics of the ecosystem via:

### Primary Metrics

- **Dance Efficiency**: Average number of tandas danced per person (overall and by role/level).
- **Participation Rate**: Percentage of dancers who danced at least X tandas.
- **Role Disparity**: Differences in average dances between Leaders and Followers.
- **Level Stratification**: Cross-level interaction matrix showing how often different skill levels dance together.
- **Sitting Out vs. Resting**:
  - **Frustrated Sit-Outs**: Wanted to dance but couldn't find partner.
  - **Voluntary Rests**: Chose not to dance for stamina/music reasons.

### Secondary Metrics

- **Satisfaction Score**: Aggregate measure combining dances achieved, partner quality, and frustration.
- **Network Density**: How connected the social graph became.
- **Repeat Partner Rate**: Average number of times dancers paired with the same person.
- **Stamina Distribution**: How many dancers ended the night exhausted vs. fresh.
- **Music Skips**: How many tandas were skipped due to music preference.

### Demographic Breakdowns

All metrics can be segmented by:

- Role (Leader/Follower/Double)
- Gender
- Dance Level (quartiles or bins)
- Age groups

## 5. Visualization

### Primary: Social Network Graph

The main visual output is an interactive **Social Network Graph**:

- **Nodes**: Dancers
  - **Shape**: Triangle (Leader), Circle (Follower), Diamond (Double).
  - **Size**: Proportional to dance level.
  - **Color**: Gradient from cool (low level) to warm (high level).
  - **Border**: State indicator - green (dancing), red (frustrated), blue (resting).
- **Edges**: Represent tandas danced together
  - **Thickness**: Number of tandas (1-3 typically).
  - **Color**: Fades with fewer interactions.
- **Layout**: Force-directed or circular by role groups.
- **Interactions**:
  - Hover to see dancer details.
  - Click node to highlight all partners.
  - Filter by role, level, or time range.

### Secondary Visualizations

1. **Timeline View**: Horizontal bars showing each dancer's night (dancing/sitting/resting) over tandas.
2. **Level Interaction Matrix**: Heatmap showing frequency of cross-level pairings.
3. **Distribution Charts**:
   - Histogram of tandas danced per person.
   - Box plots comparing roles/levels.
4. **Satisfaction Gauge**: Aggregate happiness meter.
5. **Role Balance Indicator**: Real-time ratio display.

### Monte Carlo Results Dashboard

When running multiple simulations:

- **Probability Distributions**: Violin plots of key metrics across all runs.
- **Trend Lines**: How metrics change with parameter variations.
- **Comparison View**: Side-by-side scenario results.

## 6. User Configuration

The user should be able to tweak a wide range of "inputs" to explore different scenarios:

- **Global Parameters**:
  - **Demographics**:
    - **Defaults**: 50 Leaders (3 Female), 50 Followers (1 Male), 10 Double-Role (1 Male).
    - **Gender Ratios**: Configurable per role.
  - **Social Rules**:
    - **Max Consecutive Tandas**: Default 1 (usually change partners after every tanda).
    - **Max Tandas per Night**: Default 3 per specific couple.
  - **Tanda Count**: Duration of the event.
- **Population Distributions**:
  - **Dance Level**: Avg, Skew, Spread, Min/Max.
  - **Attributes**: Distribution of Age, Sexiness, Stamina.
- **Weighting Factors (Biases)**:
  - Adjustable sliders (0-100) for the importance of **Snobism, Sexism, Ageism, Sexiness, and Friendship** in partner selection.
  - **Music Preference**: Impact of music genre on willingness to dance.
- **Monte Carlo Settings**:
  - **Number of Simulations**: Default 1000 runs.
  - **Random Seed**: For reproducibility.
  - **Parallel Execution**: Option to use multiple cores.

## 7. User Experience (UX) & Interface

### Configuration Panel

- **Grouped Controls**: Accordion-style inputs for "Demographics", "Psychology/Biases", and "Event Structure" to avoid clutter.
- **Scenario Management**:
  - **Save/Load**: Users can save their custom configurations as named scenarios.
  - **Built-in Examples**: Pre-loaded common scenarios such as:
    - _Balanced Night_ (50/50 split, low snobism).
    - _Leader Surplus_ (60L/40F, high competition).
    - _The Elite Marathon_ (High snobism, narrow level distribution).
    - _Beginner Friendly_ (Wide level distribution, open mindset).
- **Visual Feedback**: Small sparkline charts to preview level/attribute distributions before running.

### Simulation Views

1.  **Live Run (Single Night)**:
    - Visual timeline of the night (Cortina -> Tanda -> Cortina).
    - "Arena" view: Nodes moving together to dance, separating to sit.
    - Status indicators for "Sitting Out" (frustrated) vs "Resting" (tired).
2.  **Analysis (Monte Carlo)**:
    - Aggregated charts appearing after batch processing.
    - Comparison overlay to see how changing one variable (e.g., +10% Snobism) shifts the curves.

### Visualization Details

- **Nodes (Dancers)**:
  - **Shape**: Triangle (Leader), Circle (Follower), Diamond (Double).
  - **Color**: Gradient indicating Dance Level.
  - **Border**: Indicates current state (Dancing, Waiting, Resting).
- **Edges (Dances)**:
  - **Creation**: Drawn when a conceptual "match" occurs.
  - **Thickness**: Widen with repeated dances (3 tandas = thick line).

### Accessibility & Export

- **Color-blind Safe**: Alternative color schemes available.
- **Export Options**:
  - PNG/SVG for static images.
  - JSON for raw data.
  - CSV for metrics spreadsheet.
- **Responsive Design**: Works on desktop and tablet.

## 8. Technical Architecture

### Core Components

1. **Simulation Engine** (TypeScript):
   - `Dancer` class with attributes and decision logic.
   - `Milonga` class orchestrating the event.
   - `MatchingAlgorithm` class for partner selection.
   - `MetricsCollector` for tracking outcomes.

2. **State Management**:
   - React Context or Zustand for UI state.
   - Simulation state separate from UI state.

3. **Visualization Layer**:
   - D3.js or Cytoscape.js for network graphs.
   - Recharts or Chart.js for statistical plots.

4. **Worker Threads**:
   - Run Monte Carlo simulations in Web Workers to avoid blocking UI.

### Data Flow

```
User Config → Scenario Builder → Simulation Engine → Results
                                        ↓
                              Metrics Collector
                                        ↓
                          Visualization Components
```

### Performance Considerations

- Use efficient data structures (typed arrays for matrices).
- Batch DOM updates during animation.
- Lazy load visualization libraries.
- Optimize matching algorithm (O(n²) → O(n log n) where possible).

## 9. Validation & Testing

### Smoke Tests

- Extreme scenarios (100% leaders, 0% followers) should produce expected "no dances" outcome.
- Perfect balance + zero bias should maximize dancing.

### Unit Tests

- Scoring algorithm produces expected values.
- Stamina mechanics work correctly.
- Constraint violations are prevented (consecutive tandas, max per night).

### Integration Tests

- Full simulation runs without errors.
- Metrics calculations are accurate.
- Serialization/deserialization of scenarios works.

## 10. Future Goals

### Phase 2 Features

- **Advanced Behaviors**:
  - Cliques/social groups that prefer dancing together.
  - "Cabeceo shyness" - some dancers less likely to initiate.
  - Dynamic stamina (some dancers tire faster).
  - "Learning" - dancers who improve during the night.

- **Enhanced Analytics**:
  - Heatmaps of varying "Snobism" vs "Total Dances".
  - Pareto analysis (80/20 rule in dancing distribution).
  - Correlation analysis between multiple factors.
  - "Optimal balance" calculator.

- **Scenario Library**:
  - "Legendary Night" vs "Bad Night" presets.
  - Real-world milonga recreations.
  - Historical data import.

### Phase 3 Features

- **Multiplayer Mode**: Multiple users can configure their own "dancer" and see how they'd fare.
- **AI Recommendations**: "Add 3 more followers to improve efficiency by 12%".
- **Time-of-Night Effects**: Energy levels shift as night progresses.
- **Weather/Seasonal Effects**: Attendance patterns.
- **Economic Model**: Ticket pricing impact on attendance and demographics.

### Research Applications

- Academic papers on social dynamics.
- Integration with real event feedback data.
- Machine learning to predict satisfaction from demographics.
- Comparison with other partner-dance communities (salsa, swing).
