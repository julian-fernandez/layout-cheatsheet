import { Component, signal } from '@angular/core';
import { FlexboxSectionComponent } from './features/flexbox/flexbox-section.component';
import { GridSectionComponent } from './features/grid/grid-section.component';
import { GridPlaygroundComponent } from './features/playground/grid-playground.component';
import { FlexPlaygroundComponent } from './features/playground/flex-playground.component';

type Tab = 'flexbox' | 'grid' | 'grid-playground' | 'flex-playground';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FlexboxSectionComponent, GridSectionComponent, GridPlaygroundComponent, FlexPlaygroundComponent],
  template: `
    <div class="app">
      <header class="hero">
        <div class="hero__inner">
          <h1 class="hero__title">CSS Layout Cheatsheet</h1>
          <p class="hero__subtitle">
            Interactive demos for Flexbox and CSS Grid.
            Adjust the controls — the preview updates instantly.
          </p>

          <div class="tabs" role="tablist" aria-label="Layout topic">
            @for (tab of tabs; track tab.id) {
              <button
                class="tabs__btn"
                role="tab"
                type="button"
                [class.tabs__btn--active]="activeTab() === tab.id"
                [attr.aria-selected]="activeTab() === tab.id"
                (click)="activeTab.set(tab.id)"
              >
                {{ tab.label }}
              </button>
            }
          </div>
        </div>
      </header>

      <main class="content" role="tabpanel">
        @switch (activeTab()) {
          @case ('flexbox') {
            <lc-flexbox-section />
          }
          @case ('grid') {
            <lc-grid-section />
          }
          @case ('grid-playground') {
            <lc-grid-playground />
          }
          @case ('flex-playground') {
            <lc-flex-playground />
          }
        }
      </main>

      <footer class="footer">
        <p>Built with Angular 18 · Signals · SCSS</p>
      </footer>
    </div>
  `,
  styles: `
    @use 'styles/tokens' as t;

    .app {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    // ── Hero ────────────────────────────────────────────────────────────────
    .hero {
      background: t.$color-surface;
      border-bottom: 1px solid t.$color-border;
      padding: t.$spacing-xl t.$spacing-xl 0;
    }

    .hero__inner {
      max-width: 960px;
      margin: 0 auto;
    }

    .hero__title {
      font-size: clamp(1.75rem, 4vw, 2.75rem);
      margin-bottom: t.$spacing-sm;
      background: linear-gradient(135deg, t.$color-accent, #f472b6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero__subtitle {
      font-size: 1.0625rem;
      color: t.$color-text-secondary;
      max-width: 560px;
      margin-bottom: t.$spacing-lg;
    }

    // ── Tabs ────────────────────────────────────────────────────────────────
    .tabs {
      display: flex;
      gap: 0;
      border-bottom: none;
    }

    .tabs__btn {
      padding: 0.625rem 1.5rem;
      background: transparent;
      border: none;
      border-bottom: 3px solid transparent;
      color: t.$color-text-secondary;
      font-size: 0.9375rem;
      font-weight: 600;
      font-family: t.$font-sans;
      cursor: pointer;
      transition: color 0.15s, border-color 0.15s;
      margin-bottom: -1px; // sit flush on the hero border

      &:hover {
        color: t.$color-text-primary;
      }

      &--active {
        color: t.$color-accent;
        border-bottom-color: t.$color-accent;
      }
    }

    // ── Main content ────────────────────────────────────────────────────────
    .content {
      flex: 1;
      max-width: 960px;
      width: 100%;
      margin: 0 auto;
      padding: t.$spacing-xl t.$spacing-md;

      @media (min-width: 640px) {
        padding: t.$spacing-2xl t.$spacing-xl;
      }
    }

    // ── Footer ──────────────────────────────────────────────────────────────
    .footer {
      border-top: 1px solid t.$color-border;
      padding: t.$spacing-lg t.$spacing-xl;
      text-align: center;
      font-size: 0.875rem;
      color: t.$color-text-muted;
      font-family: t.$font-mono;
    }
  `,
})
export class AppComponent {
  protected readonly activeTab = signal<Tab>('flexbox');


  protected readonly tabs: { id: Tab; label: string }[] = [
    { id: 'flexbox',          label: 'Flexbox' },
    { id: 'grid',             label: 'CSS Grid' },
    { id: 'flex-playground',  label: 'Flex Playground' },
    { id: 'grid-playground',  label: 'Grid Playground' },
  ];
}
