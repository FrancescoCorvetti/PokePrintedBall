$code = @'
using System;
using System.Runtime.InteropServices;
using System.Text;

public class CredManagerPush {
    [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
    public struct CREDENTIAL {
        public uint Flags;
        public uint Type;
        public string TargetName;
        public string Comment;
        public System.Runtime.InteropServices.ComTypes.FILETIME LastWritten;
        public uint CredentialBlobSize;
        public IntPtr CredentialBlob;
        public uint Persist;
        public uint AttributeCount;
        public IntPtr Attributes;
        public string TargetAlias;
        public string UserName;
    }

    [DllImport("advapi32.dll", EntryPoint = "CredReadW", CharSet = CharSet.Unicode, SetLastError = true)]
    public static extern bool CredRead(string target, uint type, int reservedFlag, out IntPtr credentialPtr);

    [DllImport("advapi32.dll", SetLastError = true)]
    public static extern bool CredFree([In] IntPtr cred);

    public static string GetToken(string target) {
        IntPtr credPtr;
        if (CredRead(target, 1, 0, out credPtr)) {
            try {
                CREDENTIAL cred = (CREDENTIAL)Marshal.PtrToStructure(credPtr, typeof(CREDENTIAL));
                if (cred.CredentialBlobSize > 0) {
                    byte[] passwordBytes = new byte[cred.CredentialBlobSize];
                    Marshal.Copy(cred.CredentialBlob, passwordBytes, 0, (int)cred.CredentialBlobSize);
                    return Encoding.UTF8.GetString(passwordBytes).TrimEnd('\0');
                }
            } finally {
                CredFree(credPtr);
            }
        }
        return null;
    }
}
'@

Add-Type -TypeDefinition $code
$token = [CredManagerPush]::GetToken("GitHub - https://api.github.com/FrancescoCorvetti")
if ($token) {
    $authUrl = "https://x-access-token:$token@github.com/FrancescoCorvetti/PokePrintedBall.git"
    & 'C:\Users\gabri\AppData\Local\GitHubDesktop\app-3.6.5\resources\app\git\cmd\git.exe' remote set-url origin $authUrl
    & 'C:\Users\gabri\AppData\Local\GitHubDesktop\app-3.6.5\resources\app\git\cmd\git.exe' push origin main
    & 'C:\Users\gabri\AppData\Local\GitHubDesktop\app-3.6.5\resources\app\git\cmd\git.exe' remote set-url origin 'https://github.com/FrancescoCorvetti/PokePrintedBall.git'
    Write-Output "PUSH SUCCESSFUL"
} else {
    Write-Output "TOKEN NOT FOUND"
}
