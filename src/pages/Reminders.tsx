import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { Page } from '../components/ui';
import BackButton from '../components/BackButton';
import {
  pushSupported,
  isIOS,
  isStandalone,
  enablePush,
  disablePush,
  updateReminderHour,
  hasActiveSubscription,
  type PushResult,
} from '../lib/push';

const hours = Array.from({ length: 18 }, (_, i) => i + 6); // 6h às 23h

export default function Reminders() {
  const { state, activeDog, setReminder } = useStore();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [active, setActive] = useState(state.reminder.enabled);

  const iosBlocked = isIOS() && !isStandalone();

  useEffect(() => {
    hasActiveSubscription().then((has) => setActive(has && state.reminder.enabled));
  }, [state.reminder.enabled]);

  function explain(result: PushResult) {
    if (result === 'denied')
      setMsg(
        'As notificações foram bloqueadas. Ative em Ajustes → Notificações → Adestra.'
      );
    else if (result === 'unsupported')
      setMsg('Este navegador não suporta notificações. Veja a dica do iPhone abaixo.');
    else if (result === 'error')
      setMsg(
        'Não consegui ativar agora. Confirme que o app foi publicado com as chaves configuradas.'
      );
    else setMsg(null);
  }

  async function handleEnable() {
    setBusy(true);
    setMsg(null);
    const result = await enablePush(state.reminder.hour, activeDog.name);
    if (result === 'ok') {
      setReminder({ enabled: true });
      setActive(true);
      setMsg('Prontinho! Você vai receber o lembrete todos os dias. 🎉');
    } else {
      explain(result);
    }
    setBusy(false);
  }

  async function handleDisable() {
    setBusy(true);
    await disablePush();
    setReminder({ enabled: false });
    setActive(false);
    setMsg(null);
    setBusy(false);
  }

  async function handleHour(hour: number) {
    setReminder({ hour });
    if (active) {
      setBusy(true);
      await updateReminderHour(hour, activeDog.name);
      setBusy(false);
      setMsg(`Lembrete ajustado para ${hour}:00. ⏰`);
    }
  }

  return (
    <Page>
      <BackButton label="Voltar" />

      <header className="mt-2">
        <h1 className="text-2xl font-black">Lembretes de treino</h1>
        <p className="text-sm text-ink/50">
          Receba uma notificação diária para não esquecer de treinar o{' '}
          {activeDog.name}.
        </p>
      </header>

      {/* Card principal */}
      <div className="mt-5 hero-gradient rounded-3xl p-6 text-center text-white">
        <p className="text-5xl">🔔</p>
        <p className="mt-3 text-lg font-black">
          {active ? 'Lembrete ativado' : 'Lembrete diário'}
        </p>
        <p className="mt-1 text-sm font-semibold text-white/90">
          {active
            ? `Todos os dias às ${state.reminder.hour}:00`
            : 'Uma cutucada gentil por dia para manter a ofensiva 🔥'}
        </p>
      </div>

      {/* Seletor de horário */}
      <h2 className="mb-2 mt-6 px-1 text-lg font-extrabold">Horário</h2>
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
        {hours.map((h) => (
          <button
            key={h}
            onClick={() => handleHour(h)}
            className={`chip shrink-0 border px-4 py-2.5 text-sm ${
              state.reminder.hour === h
                ? 'border-brand-400 bg-brand-400 text-white'
                : 'border-brand-100 bg-white text-ink/60'
            }`}
          >
            {h}:00
          </button>
        ))}
      </div>

      {/* Ação */}
      <div className="mt-6">
        {active ? (
          <button className="btn-ghost w-full" onClick={handleDisable} disabled={busy}>
            Desativar lembretes
          </button>
        ) : (
          <button
            className="btn-primary w-full"
            onClick={handleEnable}
            disabled={busy || iosBlocked}
          >
            {busy ? 'Ativando…' : 'Ativar notificações 🔔'}
          </button>
        )}
      </div>

      {msg && (
        <div className="mt-3 rounded-2xl bg-brand-50 p-3 text-sm font-semibold text-brand-700">
          {msg}
        </div>
      )}

      {/* Aviso iPhone */}
      {iosBlocked && (
        <div className="mt-4 rounded-2xl border-2 border-amber-200 bg-amber-50 p-4">
          <p className="font-extrabold text-amber-700">📱 Passo extra no iPhone</p>
          <p className="mt-1 text-sm leading-relaxed text-amber-800">
            No iPhone, as notificações só funcionam com o app instalado. Abra este
            link no <b>Safari</b>, toque em <b>Compartilhar</b> → <b>Adicionar à
            Tela de Início</b>, e depois abra o app pelo ícone novo. Aí volte aqui
            e ative. 🐾
          </p>
        </div>
      )}

      {!pushSupported && !iosBlocked && (
        <p className="mt-4 text-center text-xs text-ink/40">
          Seu navegador não suporta notificações push.
        </p>
      )}

      <p className="mt-6 text-center text-xs text-ink/40">
        As notificações chegam mesmo com o app fechado, na tela de bloqueio.
      </p>
    </Page>
  );
}
