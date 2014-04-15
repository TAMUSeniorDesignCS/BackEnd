using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace ServerLoop
{
    class Program
    {
        static DB AAAPDatabase;
        static void Main(string[] args)
        {
            AAAPDatabase = new DB();
            while (true)
            {
                System.Threading.Thread.Sleep(60000);
                try
                {
                    ServerClean();
                }
                catch
                {
                    Console.WriteLine("ERROR: Server Clean Unsuccessful!!\n Please Check Database/Server Status!!");
                }
            }
            
        }

        static void ServerClean()
        {
            List<string> directmessagesToDelete = AAAPDatabase.SendQuery("SELECT directmessageid FROM directmessages WHERE timeout < NOW() AND timeout != '0000-00-00 00:00:00';");
        
            if (directmessagesToDelete.Count > 0)
            {
                Console.WriteLine(String.Format("{0} direct messages flagged for deletion"), directmessagesToDelete.Count);
                foreach (string entry in directmessagesToDelete)
                {
                    string dmDeleteQuery = string.Format("DELETE FROM directmessages WHERE `directmessageid`='{0}'", entry);
                    AAAPDatabase.SendQuery(dmDeleteQuery);
                }
            }
            else
            {
                Console.WriteLine("-No direct messages needed to be deleted");
            }

            List<string> postsToDelete = AAAPDatabase.SendQuery("SELECT postid FROM posts  WHERE (timeout < NOW() AND timeout != '0000-00-00 00:00:00') OR (dateposted < DATE_SUB(NOW(), INTERVAL 7 DAY));");
        
            if (postsToDelete.Count > 0)
            {
                Console.WriteLine(String.Format("{0} posts flagged for deletion"), postsToDelete.Count);
                foreach (string entry in postsToDelete)
                {
                    string postDeleteQuery = string.Format("DELETE FROM posts WHERE `postid`='{0}'", entry);
                    AAAPDatabase.SendQuery(postDeleteQuery);
                }
            }
            else
            {
                Console.WriteLine("-No posts needed to be deleted");
            }
            Console.WriteLine("Server Clean Successful - " + DateTime.Now);
        }
    }

    class DB
    {
        public MySqlConnection connection;
        public string server = string.Empty;
        public string database = string.Empty;
        public string uid = string.Empty;
        public string password = string.Empty;
        public string port = string.Empty;

        string connectionString = string.Empty;
        

        public DB()
        {
            Initialize("localhost", "3306");
        }

        private void Initialize(string ip, string port)
        {
            server = "localhost";
            database = "aaapdata";
            uid = "paul";
            password = "1234567890!@#$%^&*()";
            string connectionString;
            connectionString = "SERVER=" + server + ";" + "PORT=" + port + ";" + "DATABASE=" + database + ";" + "UID=" + uid + ";" + "PASSWORD=" + password + ";" + "AllowZeroDateTime=true;";

            connection = new MySqlConnection(connectionString);

        }

        public bool OpenConnection()
        {
            try
            {
                connection.Open();
                return true;
            }
            catch (MySqlException ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public bool CloseConnection()
        {
            try
            {
                connection.Close();
                return true;
            }
            catch (MySqlException ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public List<string> SendQuery(string query)
        {
            List<string> returnList = new List<string>();

            if (this.OpenConnection() == true)
            {
                MySqlCommand cmd = new MySqlCommand(query, connection);

                if (query.ToLower().Contains("select"))
                {
                    MySqlDataReader dataReader = cmd.ExecuteReader();

                    while (dataReader.Read())
                    {
                        for (int i = 0; i < dataReader.FieldCount; i++)
                        {
                            returnList.Add(dataReader.GetName(i) + " : " + dataReader.GetValue(i) + "\n");
                        }
                        returnList.Add("\n");
                    }
                }
                else
                {
                    cmd.ExecuteNonQuery();
                }

                this.CloseConnection();
            }
            else
            {
                returnList.Add("Unable to Connect  to SQL Server");
            }

            return returnList;
        }
    }
}
