using Matcha.Server.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Matcha.Server.WebSocketsManager
{
    internal static class WebSocketsManager
    {
        private static ConcurrentDictionary<long, ConcurrentDictionary<long, WebSocket>> _storage;

        static WebSocketsManager()
        {
            _storage = new();
        }

        public static void AddSession(long userId, long sessionId, WebSocket socket)
        {
            var sessions = _storage.GetOrAdd(userId, new ConcurrentDictionary<long, WebSocket>());

            sessions.TryAdd(sessionId, socket);
        }

        public static void CloseSession(long userId, long sessionId)
        {
            if (_storage.TryGetValue(userId, out var sessions))
            {
                sessions.TryRemove(sessionId, out var socket);

                socket.CloseOutputAsync(WebSocketCloseStatus.Empty, null, CancellationToken.None);

                if (sessions.Count == 0)
                    _storage.TryRemove(sessionId, out _);
            }
        }

        public static async Task Send(long userId, WebSocketRequestModel request)
        {
            if (_storage.TryGetValue(userId, out var sessions))
            {
                var messageJson = JsonConvert.SerializeObject(request);
                var messageBytes = Encoding.UTF8.GetBytes(messageJson);
                var segment = new ArraySegment<byte>(messageBytes);

                foreach (var sessionSocket in sessions.Values)
                {
                    await sessionSocket.SendAsync(segment, WebSocketMessageType.Text, true, CancellationToken.None);
                }
            }
        }
    }
}
